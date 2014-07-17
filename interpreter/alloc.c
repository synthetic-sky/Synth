/*
 * Allocate a new buffer
 *
*/
void* synth_alloc (int bytes)
{
    return malloc (bytes);
}

/*
 * Move existing data to a larger buffer
 *
*/
void* synth_realloc (void* buffer, int bytes)
{
    return realloc (buffer, bytes);
}