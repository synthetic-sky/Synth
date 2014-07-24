/*
 * Create a new chained list
 *
*/
List list_new ()
{
    List list = synth_alloc (sizeof (struct synth_list_t));
    
    list->data = NULL;
    list->buffer = synth_alloc (SYNTH_LIST_MIN_SIZE * sizeof (void*));
    list->elements = 0;
    list->max_size = SYNTH_LIST_MIN_SIZE;
    
    return list;
}

/*
 * Append a **ptr** to the end of the **list**.
 *
*/
void list_push (List list, void* ptr)
{
    if (list->elements == list->max_size)
        list_grow (list);
    
    list->buffer [list->elements ++] = ptr;
}

/*
 * Retrieve the pointer at **index** from the **list**.
 *
*/
void* list_get (List list, int index)
{
    return list->buffer [index];
}

/*
 * Grow the memory buffer of a **list**, because it is full.
 *
*/
void list_grow (List list)
{
    list->max_size = floor (list->max_size * 1.5);
    
    list->buffer = synth_realloc (list->buffer, list->max_size * sizeof (void*));
}

/*
 * Check if a **list**, contains a certain **element**.
 *
*/
bool list_contains (List list, void* element)
{
    list_iter (list, void*, ptr)
        if (ptr == element)
            return true;
            
    return false;
}