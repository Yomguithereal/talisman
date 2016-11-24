module.exports = function(context) {
  const t = context.types;

  return {
    visitor: {
      Program: {
        exit(path) {
          if (path.BABEL_PLUGIN_ADD_MODULE_EXPORTS) {
            return;
          }

          let hasExportDefault = false;
          const namedExports = new Set();
          path.get('body').forEach(function(p) {

            if (p.isExportDefaultDeclaration()) {
              hasExportDefault = true;
              return;
            }

            if (p.isExportNamedDeclaration()) {
              if (p.node.specifiers.length === 1 && p.node.specifiers[0].exported.name === 'default') {
                hasExportDefault = true;
              }
              else if (p.node.declaration && t.isFunctionDeclaration(p.node.declaration)) {
                namedExports.add(p.node.declaration.id.name);
              }
              else {
                p.node.specifiers.forEach(function(specifier) {
                  namedExports.add(specifier.exported.name);
                });
              }
              return;
            }

            // NOTE: this is not ideal & kinda loops on Punkt
            if (p.isVariableDeclaration()) {
              p.container.forEach(function(node) {

                if (
                  t.isExportNamedDeclaration(node) &&
                  node.declaration &&
                  node.declaration.declarations
                ) {
                  namedExports.add(node.declaration.declarations[0].id.name);
                }

                if (
                  t.isExportNamedDeclaration(node) &&
                  node.declaration &&
                  t.isFunctionDeclaration(node.declaration)
                ) {
                  namedExports.add(node.declaration.id.name)
                }
              });
            }
          });

          if (hasExportDefault) {
            path.pushContainer('body', [
              t.expressionStatement(t.assignmentExpression(
                '=',
                t.memberExpression(t.identifier('module'), t.identifier('exports')),
                t.memberExpression(t.identifier('exports'), t.stringLiteral('default'), true)
              ))
            ]);

            if (namedExports.size) {
              namedExports.forEach(function(name) {
                path.pushContainer('body', [
                  t.expressionStatement(t.assignmentExpression(
                    '=',
                    t.memberExpression(
                      t.memberExpression(t.identifier('exports'), t.stringLiteral('default'), true),
                      t.identifier(name)
                    ),
                    t.memberExpression(
                      t.identifier('exports'),
                      t.identifier(name)
                    )
                  ))
                ]);
              });

              path.BABEL_PLUGIN_NEED_TO_SHIFT_MODULE = true;
            }
          }

          path.BABEL_PLUGIN_ADD_MODULE_EXPORTS = true;
        }
      }
    },
    post(state) {
      if (!state.path.BABEL_PLUGIN_NEED_TO_SHIFT_MODULE)
        return;

      const program = state.path.get('body')[0].node;
      program.expression.arguments[2].properties[0].value = t.booleanLiteral(false);
    }
  };
};
