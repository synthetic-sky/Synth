#ifndef __SYNTH_CHAINED_LIST__
#define __SYNTH_CHAINED_LIST__

typedef struct synth_chained_list_t {
    allocator_header
    
    List lists;
} *ListChain;

int list_chain_len (ListChain);

ListChain list_chain_new ();
void list_chain_push (ListChain, void*);
void* list_chain_get (ListChain, int);
List list_chain_grow (ListChain);

#endif