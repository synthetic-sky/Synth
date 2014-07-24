#ifndef __SYNTH_UTILS__
#define __SYNTH_UTILS__

#define bool int

#define false 0
#define  true 1

#define string char*
#define bitfield struct
#define ascii char

#define zero_field(buf) memset(buf, 0, sizeof(buf));

static int _i[2000];

#define eq(x,y) (strcmp(x,y) == 0)
#define neq(x,y) (! eq(x,y))

#define ifnt(x) if (!(x))
#define unless ifnt

static inline string ltos (long num)
{
    static ascii buf[64];
    sprintf(buf, "%l", num);
    return buf;
}

/*
 * ANSI Color Codes 
 *   Taken from http://stackoverflow.com/questions/3219393/stdlib-and-colored-output-in-c/3219471#3219471
 *
 *   e.g. **printf(ANSI_COLOR_RED "failed" ANSI_COLOR_RESET "\n");**
*/
#define ANSI_COLOR_RED     "\x1b[31m"
#define ANSI_COLOR_GREEN   "\x1b[32m"
#define ANSI_COLOR_YELLOW  "\x1b[33m"
#define ANSI_COLOR_BLUE    "\x1b[34m"
#define ANSI_COLOR_MAGENTA "\x1b[35m"
#define ANSI_COLOR_CYAN    "\x1b[36m"
#define ANSI_COLOR_RESET   "\x1b[0m"

#endif