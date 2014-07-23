#ifndef __SYNTH_PARSER__
#define __SYNTH_PARSER__

GraphNode parser_parse (string);
GraphNode parser_parse_file (string);
json_t* parser_invoke_external_parser (string);
GraphNode parser_translate_AST_to_graphcode (json_t*);

#define parser_init_vocabulary() \
    load_concept (Next); \
    load_concept (List_v1); \
    load_concept (Map_v1); \
    load_concept (GC_Assign); \
    load_concept (GC_Call); \
    load_concept (GC_CondGate); \
    load_concept (GC_SchedGate); \
    load_concept (GC_Pattern); \
    load_concept (GC_Change); \
    load_concept (GC_OP_AddNode); \
    load_concept (GC_OP_DelNode); \
    load_concept (GC_OP_AddLink); \
    load_concept (GC_OP_DelLink); \
    load_concept (GC_DATA_Name); \
    load_concept (GC_DATA_Number); \
    load_concept (GC_DATA_String);
    
#define graph_code_assign(name, call) ({ \
    assert (GC_Assign); /* call graph_code_init_composer() first. */ \
    GraphNode assignment = new_instance_of (GC_Assign); \
    GraphNode scheduler_gate = new_instance_of (GC_SchedGate); \
    graph_connect (assignment, Any, scheduler_gate); \
    graph_connect (scheduler_gate, Any, new_instance_of (GC_CondGate)); \
    GraphNode name = new_instance_of (GC_DATA_Name); \
    graph_connect (assignment, GC_DATA_Name, name); \
})

string escape (string, char);

#endif