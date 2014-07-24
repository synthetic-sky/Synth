#ifndef __SYNTH_HASHMAP__
#define __SYNTH_HASHMAP__

typedef struct synth_hashmap_t {
    allocator_header
    
    json_t* __internal;
} *HashMap;

HashMap hashmap_new (void);
void* hashmap_get (HashMap, string);
string hashmap_get_string (HashMap, string);
void hashmap_set (HashMap, string, void*);

#endif