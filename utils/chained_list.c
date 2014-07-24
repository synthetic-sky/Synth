/*
 * Create a new chained list
 *
*/
ListChain list_chain_new ()
{
    ListChain chain = synth_alloc (sizeof (struct synth_list_t));
    
    chain->lists = list_new ();
    
    return chain;
}

/*
 * Push an element to the end of a chained list
 *
*/
void list_chain_push (ListChain chain, void* ptr)
{
    List last = list_get_last (chain->lists);
    if (list_is_full (last))
        last = list_chain_grow (chain);
        
    list_push (last, ptr);
}

/*
 * Retrieve an element from a chained list given its index
 *
*/
void* list_chain_get (ListChain chain, int index)
{
    list_iter (chain->lists, List, list)
        if (index < SYNTH_LIST_MIN_SIZE)
            return list_get (list, index);
        else
            index -= SYNTH_LIST_MIN_SIZE;
            
    return NULL;
}

/*
 * Create a new chained list
 *
*/
List list_chain_grow (ListChain chain)
{
    List list = list_new ();
    
    list_push (chain->lists, list);
    
    return list;
}

/*
 * Count the number of elements in a chained list
 *
*/
int list_chain_len (ListChain chain)
{
    int len = 0;
    
    list_iter (chain->lists, List, list)
        len += list_len (list);
        
    return len;
}