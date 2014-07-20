/*
 * Create a new graph node
 *
*/
GraphNode graph_node_new ()
{
    GraphNode node = synth_alloc (sizeof (struct graph_node_t));
    
    node->ident = new_unique_ident ();
    
    node->links_incoming = list_new ();
    node->links_outgoing = list_new ();
    
    return node;
}

/*
 * Create a new graph link
 *
*/
GraphLink graph_link_new (GraphNode origin, GraphNode type, GraphNode target)
{
    GraphLink link = synth_alloc (sizeof (struct graph_link_t));

    link->origin = origin;
    link->type   = type;
    link->target = target;
    
    list_push (origin->links_outgoing, link);
    list_push (target->links_incoming, origin);
    
    return link;
}