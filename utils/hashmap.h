#ifndef __SYNTH_HASHMAP__
#define __SYNTH_HASHMAP__

typedef struct synth_hashmap_t {
    allocator_header
    
    
} *HashMap;

void* hashmap_find (HashMap, string);

#endif