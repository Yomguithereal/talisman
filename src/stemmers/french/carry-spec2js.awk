# Generates javascript code from Carry specification publication
# curl -s http://www.otlet-institute.org/docs/Carry.pdf | pdftotext -f 6 -layout -nopgbrk - - | awk -f carry-spec2js.awk
# 2017, Raphaël Droz
{
	if ($0 ~ /^ +[0-9]+$/) next; 	# page number
	if ($0 ~ /A\..*Étape/) { 	# step number
		if (gotstep) print("];\n");
		gotstep = 1;
		printf("const STEP%d = [\n", $3);
		next;
	}
	# empty lines
	if ($0 ~ /^[[:space:]]*$/) next;
	# page 6
	if (! gotstep) next;
	sub(/^[[:space:]]*/, "");
	# line pattern: (m > N) SUFF SUBST|ε
	#                    $3  $4    $5
	if ($5 == "ε") printf("  [%d, '%s'],\n", $3, $4);
	else printf("  [%d, '%s', '%s'],\n", $3, $4, $5);
}
END { print("];"); }
