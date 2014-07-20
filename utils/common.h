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

#define unless(x) if (!(x))

static inline string ltos (long num)
{
    static ascii buf[64];
    sprintf(buf, "%l", num);
    return buf;
}

#endif