/*
 * The handler that is invoked at every sched gate.
 *
 *   The scheduler handles all data-flow and manages the control-state graph.
 *
 *   This interrupt also allows us to interrupt long-running branches,
 *     if we predict they will not succeed in time.
*/
void scheduler_gate (GraphNode csg, GraphNode gate)
{
    load_concept (CondGate)
    load_concept (Next)
    
    GraphNode cond = find_link_target (gate, CondGate, CondGate);
 
    GraphNode pathway = scheduler_cond_gate (csg, cond);
    
    // call if we can
    if (pathway)
    {
        scheduler_call (csg, pathway);
    }
    else
    {
        // backtrack
    }
}

GraphNode scheduler_cond_gate (GraphNode csg, GraphNode cond)
{
    load_concept (Next);
    load_concept (GC_CondGate);
    
    // check condition
    if (scheduler_check_condition (csg, cond))
    {
        scheduler_call (csg, cond);
    }
    
    // fallback if possible
    else
    { 
        GraphNode cond = find_link_target (cond, Next, GC_CondGate);
    
        if (cond)
            return scheduler_cond_gate (csg, cond);   
    }
    
    return NULL;
}

/*
 * Check if a *Condition* obtains for a given *State*.
 *
*/
bool scheduler_check_condition (GraphNode state, GraphNode cond)
{
    load_concept (Pattern);
    
    GraphNode pattern = find_link_target (cond, Pattern, Pattern);
    
    return rx_does_match (state, pattern);
}

/*
 * Perform a jump, creating a new state,
 *   and registering the transition in the *CSG*.
 *
*/
bool scheduler_call (GraphNode state, GraphNode pathway)
{
    parser_init_vocabulary ();
    
    //        Pathway
    // Pattern <  > Change
    //
    
    GraphNode change  = get_attr (pathway, GC_Change);
    GraphNode cond = get_attr (pathway, GC_CondGate);
    GraphNode pattern = get_attr (cond, GC_Pattern);
    
    PatternMatch match = rx_get_match (state, pattern);
    
    list_v1_iter (change, action,
        
        if (action == GC_OP_AddLink)
        {
            // ...
        }
        else
        if (action == GC_OP_AddNode)
        {
            // ...
        }
        else
        if (action == GC_OP_DelLink)
        {
            // ...
        }
        else
        if (action == GC_OP_DelNode)
        {
            // ...
        }
    );
    
    return false;
}