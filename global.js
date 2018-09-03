var Global =
{
	dataDir: "./data",
	clientSaveUrl: "/client/save/:id/:firstName/:surname/:addressType/:streetAddress/:suburb/:city/:postalCode",
	clientDeleteUrl: "/client/delete/:id",
	basketAddItemUrl: "/basket/add/:orderId/:clientId/:productId",
	basketRemoveItemUrl: "/basket/remove/:orderId/:productId",
	basketCompleteUrl: "/basket/complete/:orderId"
};

module.exports = Global;
