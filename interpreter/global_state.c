// globals
ident_t _unique;

/*
 * Initialise all global variables to a sane state.
 *
 *  This may include loading some data from storage.
*/
void init_global_state ()
{
    _unique = 1;
}

/*
 * Find a node in the global {ident -> node} index
 *
*/
GraphNode global_state_find_node (ident_t ident)
{
    return hashmap_find (synth_ident_to_node, ltos (ident));
}