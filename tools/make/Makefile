JANSSON_STATIC = ./ext/deps/jansson-2.6/src/.libs/libjansson.a
JANSSON_INCLUDE = ./ext/deps/jansson-2.6/src/

OPTPARSE = ./ext/deps/optparse/optparse.c

synth: synth.c interpreter/*.c interpreter/tests/*.c utils/*.c utils/tests/*.c
	gcc -o bin/synth \
	  -g -std=gnu99 -lm \
	    -I$(JANSSON_INCLUDE) \
	      -include synth.h $(OPTPARSE) $+ \
	     	$(JANSSON_STATIC)
