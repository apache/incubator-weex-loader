var modal
__weex_define__('@weex-component/toast', [], function(__weex_require__) {
    modal = __weex_require__('@weex-module/modal')
})

module.exports = function(msg) {
    modal.toast({message: msg})
}