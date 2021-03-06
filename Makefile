.PHONY: check,mocha-test,test

PATH := ./node_modules/.bin:$(PATH)
SHELL := /bin/bash
MOCHA_FILES := $(shell find ./test -name '*_test.js')

# 轮询指令
all: check mocha-test

# 测试指令
test: mocha-test test-cov

# 检测代码是否符合标准
check: $(shell find . -name '*.js' ! -path './node_modules/*' ! -path './coverage/*' ! -path './mochawesome-reports/*' ! -path './webPage/*' ! -path './tools/webTools/*')
	@jshint $^

# mocha测试
mocha-test: $(MOCHA_FILES)
	@mocha $^ --reporter mochawesome

# 清除
clean: lib-cov
	@rm -rf test-cov

# 测试覆盖率
test-cov: $(MOCHA_FILES)
	@istanbul cover node_modules/.bin/_mocha $^ -R spec
