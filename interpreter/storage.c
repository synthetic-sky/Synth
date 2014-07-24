// bool store_graph (Graph graph)
// {
    
// }

bool store_color (GraphNode color)
{
    return false;
}

string serialize_graph_node (GraphNode node)
{
    static ascii buffer [SYNTH_NODE_STORAGE_MAX_SIZE];
    zero_field (buffer);
    
    int max_len = SYNTH_NODE_STORAGE_MAX_SIZE;
    int offset = 0;
    int wrote = 0;
    
    wrote = sprintf (buffer, "node [%li; ", node->ident);
    
    string str = buffer + wrote;
    
    list_iter (node->links_outgoing, GraphLink, link)
    {
        string link_serialized = serialize_graph_link (link, &wrote);
            
        if (offset + wrote + 10 > SYNTH_NODE_STORAGE_MAX_SIZE)
            return NULL;
        offset += wrote;
        
        str = strcat (str, link_serialized);
    }
    
    strcat (str, "]\n");
    
    return buffer;
}

string serialize_graph_link (GraphLink link, int* written)
{
    static ascii buffer [SYNTH_LINK_STORAGE_MAX_SIZE];
    zero_field (buffer);
    
    *written = sprintf (buffer, "(%li, %li, %li)", link_origin_ident (link), link_type_ident (link), link_target_ident (link));
    
    return buffer;
}