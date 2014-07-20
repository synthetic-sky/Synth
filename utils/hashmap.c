/*
 * Create a new hashmap
 *
*/
HashMap hashmap_new ()
{
    HashMap map = synth_alloc (sizeof (struct synth_hashmap_t));
    
    return map;
}

/*
 * Lookup a value by its **key**.
 *
*/
void* hashmap_find (HashMap map, string key)
{
    return NULL;
}