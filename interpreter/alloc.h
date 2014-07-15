#ifndef __SYNTH_ALLOC__
#define __SYNTH_ALLOC__

#define allocator_header int alloc_header;

void* synth_alloc (int bytes);
void* synth_realloc (void* buffer, int bytes);

#endif