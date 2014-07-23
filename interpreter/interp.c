/*
 * Evaluate a single pathway jump. A jump is basically a graph-code statement. 
 *
 * A jump is a transition from one sub-graph (taken to represent a state),
 *   to a new sub-graph (representing a slightly changed state).
 *
 * Think of one tick of the clock, and some atoms moving. Etc.
 *
 *  The CSG is here equivalent to a call-tree. 
 *    It remembers all the states, and all the transitions between them,
 *      allowing us to back-track later - if we were successful, we will be returning results;
 *        if not, we will be returning impasses, and the scheduler will try another avenue. 
 *
 * The active **control state graph**, and the **pathway** must be specified.
*/
void interpreter_eval (GraphNode csg, GraphCode pathway)
{
    load_concept (Pathway)
    load_concept (GC_SchedGate)
    load_concept (Change)
    
    assert (csg);
    
    find_link_target (pathway, Any, GC_SchedGate);
    // ident_t ident = N2n(number);
    // global_state_lookup_concept ()
}

/*
 * Load and evaluate the contents of a script file,
 *   located at **path**.
 *
*/
bool interpreter_eval_file (string path)
{
    GraphCode code = parser_parse_file (path);
    
    ifnt (code)
        return false;
    
    runloop_run_program (code);
}