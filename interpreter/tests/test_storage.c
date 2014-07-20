void test_storage () {
    plan (2, storage backend)
    
    _unique = 1;
    GraphNode node1 = graph_node_new ();
    GraphNode node2 = graph_node_new ();
    GraphNode node3 = graph_node_new ();
    GraphLink link  = graph_link_new (node1, node2, node3);
    
    int wrote;
    string str = serialize_graph_link (link, &wrote);
    ok (wrote == 9, "the correct output should have 9 chars")
    //printf("serialize_graph_link: %s\n", str);
    
    skip("serialize_graph_node nyi")
    //!str = serialize_graph_node (node1);
    //nok (strlen(str) == 16, "the correct output should have 16 chars")
    //printf("serialize_graph_node: %s\n", str);
}