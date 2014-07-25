/*
 * Return a copy of a string.
 *
 *  Use our custom allocator.
*/
string copy_string (string str)
{
  int len = strlen (str);
  string copy = synth_alloc (len + 1);
  memcpy (copy, str, len);
  return copy;
}

/*
 * Escape a character **bad_char** within a string **str**.
 * 
 *  ! This code also escapes any backslashes in the string -- why ?
 *     -- we copied this code from an external source without understanding it
*/
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