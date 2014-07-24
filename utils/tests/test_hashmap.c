void test_hashmap ()
{
    plan (2, utils/hashmap)
    
    string v;
    HashMap map = hashmap_new ();
    
    hashmap_set (map, "key", "value");
    v = hashmap_get (map, "key");
    
    ok (eq (v, "value"), "hashmap not returning correct value");
    
    hashmap_set (map, "key", "substitute");
    v = hashmap_get (map, "key");
    
    ok (eq (v, "substitute"), "hashmap does not allow updating entries");
}