JANSSON_STATIC = ./ext/deps/jansson-2.6/src/.libs/libjansson.a
JANSSON_INCLUDE = ./ext/deps/jansson-2.6/src/

OPTPARSE = ./ext/deps/optparse/optparse.c
OPTPARSE_STATIC = ./bin/.so/optparse.a

all: optparse synth

synth: synth.c interpreter/*.c interpreter/tests/*.c utils/*.c utils/tests/*.c
	clang -o bin/synth \
	  -g -std=gnu99 -lm \
	    -I$(JANSSON_INCLUDE) \
	      -include synth.h $+ \
	     	$(JANSSON_STATIC) $(OPTPARSE_STATIC)

optparse: $(OPTPARSE)
	clang -c -static -fPIC -o $(OPTPARSE_STATIC) \
	  -g -std=gnu99 -Wno-format $+
