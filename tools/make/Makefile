JANSSON = ./ext/deps/jansson-2.6/src/.libs

synth: synth.c interpreter/*.c interpreter/tests/*.c utils/*.c utils/tests/*.c
	gcc -I$(JANSSON) -lm -ljansson -o bin/synth -include synth.h $+
