/*
 * Create a new hashmap
 *
*/
HashMap hashmap_new (void)
{
    HashMap map = synth_alloc (sizeof (struct synth_hashmap_t));
    
    map->__internal = json_object ();
    
    return map;
}

/*
 * Lookup a value by its **key**.
 *
*/
string hashmap_get_string (HashMap map, string key)
{
    json_t* value = json_object_get (map->__internal, key);
    
    if (value)
        return json_string_value (value);
    else    
        return NULL;
}

/*
 * Lookup a value by its **key**.
 *
*/
void* hashmap_get (HashMap map, string key)
{
    json_t* value = json_object_get (map->__internal, key);
    
    if (value)
        return (void*) json_integer_value (value);
        
    return NULL;
}

/*
 * Set **key** = **value**.
 *
*/
void hashmap_set (HashMap map, string key, void* value)
{
    json_object_set_new_nocheck (map->__internal, key, json_integer ((long) value));
}