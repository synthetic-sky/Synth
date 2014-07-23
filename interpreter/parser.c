/*
 * Parse a string, containing pathway code.
 *
 *  Returns the fully loaded graph code.
*/
GraphCode parser_parse (string code)
{
    
}

/*
 * Parse a file containing pathway code.
 *
 *  Returns the fully loaded graph code.
*/
GraphCode parser_parse_file (string path)
{
    ascii cmd [200000] = {0};
    
    sprintf (cmd, "python2.7 tools/parser/parse.py -f \"%s\"", escape (path, '"'));
    
    json_t* ast = parser_invoke_external_parser (path);
    
    ifnt (ast)
        return NULL;
        
    return parser_translate_AST_to_graphcode (ast);
}


/*
 * Invoke the external python parser in order to parse code into an AST.
 *
 *  We invoke using a one-way pipe, sending the **request** as a command line argument ahead.
 *
 *  The request either contains the code, or the path to the file which contains the code.
 *
 *  The AST is passed back to us as JSON, which we parse using jansson.
*/
json_t* parser_invoke_external_parser (string request)
{
    ascii cmd [2000000] = {0};
    
    sprintf (cmd, "python2.7 tools/parser/parse.py -c \"%s\"", escape (request, '"'));
    
    // Invoke the external parser
    string output = invoke_and_capture_output (cmd);
    
    ifnt (output)
    {
        // ...
        
        perror ("parser_invoke_external_parser: tools/parser did not return *anything*.\n");
        
        return NULL;
    }
    
    // Parse the JSON result
    json_error_t json_err;
    json_t* ast = json_loads (output, 0, &json_err);
    
    ifnt (ast)
    {
        // ... json_err ...
        
        error (0, 0, "parser_invoke_external_parser: jansson failed to parse the output we received from tools/parser.");
        
        return NULL;
    }
    
    return ast;
}

/*
 * Translate an AST to GraphCode.
 *
 * 
*/
GraphNode parser_translate_AST_to_graphcode (json_t* AST)
{
    
}

string escape (string str, char bad_char)
{
    static ascii buf [2000000];
    zero_field (buf);
    
    char c; string p = buf;
    while ((c = *str++))
    {
        if (c == bad_char || c == '\\')
            *p++ = '\\';
        *p++ = c;
    }
    
    return buf;
}