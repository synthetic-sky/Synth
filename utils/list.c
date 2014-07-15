List list_new ()
{
    List list = synth_alloc (sizeof (struct synth_list_t));
    
    list->data = NULL;
    list->buffer = synth_alloc (SYNTH_LIST_MIN_SIZE * sizeof (void*));
    list->elements = 0;
    list->max_size = SYNTH_LIST_MIN_SIZE;
}

void list_push (List list, void* ptr)
{
    if (list->elements == list->max_size)
        list = list_grow (list);
        
    list->buffer [list->elements ++] = ptr;
}

void* list_get (List list, int index)
{
    return list->buffer [index];
}

List list_grow (List list)
{
    list->max_size = floor (list->max_size * 1.5);
    
    return synth_realloc (list, list->max_size);
}