#ifndef __SYNTH_LIST__
#define __SYNTH_LIST__

#define SYNTH_LIST_MIN_SIZE 20

typedef struct synth_list_t {
    allocator_header
    
    int elements;
    int max_size;
    void* data;
    void** buffer;
} *List;

#define list_len(list) list->elements

List list_new ();
void list_push (List, void*);
void* list_get (List, int);
List list_grow (List);

#endif