#ifndef __SYNTH_TEST__
#define __SYNTH_TEST__

// micro test framework
static int test_number;
static int planned_tests;
#define test(result, description) ({ \
    bool _ok = result; \
	test_number++; \
	if (_ok) printf("ok, %i\n", test_number); else printf("fail, %i: %s\n", test_number, #description); \
	_ok; \
})
#define ok(r,d) test(r,d);
#define nok(r,d) test(!(r),d);
#define fail(result, description) ok(!(result), #description)
#define plan(num, title) planned_tests = num; printf("Planned %i tests for %s..\n", num, #title);
#define skip(descr) printf("skip, %i: %s\n", ++test_number, descr);

// test suite
void test_suite ();
void test_sanity ();
void test_alloc ();
void test_list ();
void test_storage ();

#endif