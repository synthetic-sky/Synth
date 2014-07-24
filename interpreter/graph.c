/*
 * Create a new graph node
 *
*/
GraphNode graph_node_new ()
{
    GraphNode node = synth_alloc (sizeof (struct graph_node_t));
    
    node->ident = new_unique_ident ();
    
    node->types = list_new ();
    
    node->links_incoming = list_new ();
    node->links_outgoing = list_new ();
    
    return node;
}

/*
 * Set up an inheritance relationship between **node** and **base_type**.
 *
*/
GraphNode graph_node_inherit (GraphNode node, GraphNode base_type)
{
    return NULL;
}

/*
 * Check if a **node** has a given **type**.
 *
 *  Note that not only may the type have been inherited, 
 *   but also any currently matching pattern counts as a type of the node.
*/
bool node_has_type (GraphNode node, GraphNode type)
{
    return list_contains (node->types, type); // we assume this has been cached
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

/*
 * Find a link, if it exists.
 *
 *  Requires the **node**, the **link-type**, the **end-point-type**,
 *   and an indication of whether we are looking for an outgoing (default),
 *    or an incoming (**reversed** = true) connection.
 *
*/
GraphLink graph_find_link (GraphNode node, GraphNode link_type, GraphNode end_point_type, bool reversed)
{
    if (reversed)
    {
        list_iter (node->links_incoming, GraphLink, link)
            if (node_has_type (link_type_ptr (link), link_type))
                if (node_has_type (link_target_ptr (link), end_point_type))
                    return link;
    }
    else
    {
        list_iter (node->links_outgoing, GraphLink, link)
            if (node_has_type (link_type_ptr (link), link_type))
                if (node_has_type (link_origin_ptr (link), end_point_type))
                    return link;
    }
    
    return NULL;
}

/*
 * Find the endpoint of a link, if it exists.
 *
 *  Requires the **node**, the **link-type**, the **end-point-type**,
 *   and an indication of whether we are looking for an outgoing (default),
 *    or an incoming (**reversed** = true) connection.
 *
*/
GraphNode graph_find_endpoint (GraphNode node, GraphNode link_type, GraphNode end_point_type, bool reversed)
{
    GraphLink link = graph_find_link (node, link_type, end_point_type, reversed);
    
    if (link)
        return reversed ? link_origin_ptr (link) : link_target_ptr (link);
    else
        return NULL;
}

/*
 * Add a new node **elem** to a **color**.
 *
*/
void graph_color_add_elem (GraphNode color, GraphNode elem)
{
    
}

/*
 * Remove a node **elem** from a **color**.
 *
*/
void graph_color_del_elem (GraphNode, GraphNode);
