JANSSON_STATIC = ./ext/deps/jansson-2.6/src/.libs/libjansson.a

synth: synth.c interpreter/*.c interpreter/tests/*.c utils/*.c utils/tests/*.c
	gcc -g -std=gnu99 -lm $(JANSSON_STATIC) -o bin/synth -include synth.h $+
