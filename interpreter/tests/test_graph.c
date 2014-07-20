void test_graph ()
{
    plan (12, graph)
    
    _unique = 1;
    GraphNode node1 = graph_node_new ();
    GraphNode node2 = graph_node_new ();
    GraphNode node3 = graph_node_new ();
    ok (node2->ident > node1->ident, "new nodes should have increasing ident numbers")
    ok (list_len (node1->links_incoming) == 0, "node1.incoming should be empty")
    ok (list_len (node2->links_incoming) == 0, "node2.incoming should be empty")
    ok (list_len (node3->links_incoming) == 0, "node3.incoming should be empty")
    ok (list_len (node1->links_outgoing) == 0, "node1.outgoing should be empty")
    ok (list_len (node2->links_outgoing) == 0, "node2.outgoing should be empty")
    ok (list_len (node3->links_outgoing) == 0, "node3.outgoing should be empty")
    GraphLink link  = graph_link_new (node1, node2, node3);
    ok (link->origin == node1, "link->origin should be node1")
    ok (link->type == node2, "link->origin should be node2")
    ok (link->target == node3, "link->origin should be node3")
    ok (list_len (node3->links_incoming) == 1, "node3.incoming should not be empty")
    ok (list_len (node1->links_outgoing) == 1, "node1.outgoing should not be empty")
}