// globals
ident_t _unique;
GraphNode Any;

/*
 * Initialise all global variables to a sane state.
 *
 *  This may include loading some data from storage.
*/
void init_global_state ()
{
    _unique = 1;
    Any = NULL;
}

/*
 * Find a node in the global {ident -> node} index
 *
*/
GraphNode global_state_find_node (ident_t ident)
{
    return hashmap_find (synth_ident_to_node, ltos (ident));
}

/*
 * Find a node in the global {ident -> node} index, 
 *   or add it if it does not exist.
 *
*/
GraphNode global_state_find_or_add_node (string ident_s)
{
    GraphNode node = hashmap_find (synth_ident_to_node, ident_s);
    
    ifnt (node)
    {
        node = graph_node_new ();
        
        node->flags.global = true;
        
        global_state_add_node (node);
    }
    
    return node;
}


/*
 * Register a node in the global {ident -> node} index.
 *
*/
GraphNode global_state_add_node (GraphNode node)
{
    hashmap_set (synth_ident_to_node, ltos (node->ident), node);
}