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

List list_new ();
void list_push (List, void*);
void* list_get (List, int);
void* list_set (List, int, void*);
void list_grow (List);

#define list_len(list) list->elements
#define list_iter(list, type, value) for (type value = ({ _i [__LINE__] = 0; NULL; }); _i [__LINE__] < list_len (list); _i [__LINE__] ++)

#define list_get_first(list) list_get (list, 0)
#define list_get_last(list) list_get (list, list_len (list) - 1)

#define list_is_full(list) list_len (list) == list->max_size

#endif