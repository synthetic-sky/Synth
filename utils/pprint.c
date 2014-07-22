void print_list (List list)
{
    printf ("[");
    list_iter (list, void*, ptr)
        printf ("%li, ", (long) ptr);
    printf ("\b\b]\n");
}