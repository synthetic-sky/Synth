void test_sanity () {
	plan (2, utils/test)
	ok (1, 1 should be true)
	fail (0, 0 should be false)
}