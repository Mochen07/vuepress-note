# kzl-后台合并v4（优化）

## 全局数据

需要的功能模块

  1. 用户信息
  2. 机构信息
     1. 连锁信息
     2. 品牌信息
     3. 门店信息
  3. 路由信息

### 用户信息

```typescript
export interface UserInfo {
  /** 用户id */
  /** 用户名称 */
  /** token */
  /** refreshToken */
  /** ... */
}

// api
/** 更新用户信息(传入Partial<ChainInfo>) */
  1. 设置用户信息 走api
  2. 特殊值更新的后续操作
    1. 更新 用户id/token/refreshToken任意字段
      1. 更新连锁信息 走api
/** 设置用户信息(同步store/localStorage) */
/** 获取用户信息(返回全部或者某个字段的值) */
/** 删除用户信息 */
  1. 删除机构信息 走api
  2. 删除路由信息 走api
/** 从localStorage恢复store用户信息(页面登陆持久化使用) */
  1. 设置用户信息 走api
  1. 从localStorage恢复store机构信息 走api
/** 是否登陆 */
```

### 机构信息

```typescript
/** 删除机构信息 */
/** localStorage跨窗口数据同步信息（用于维护当前的机构信息，这是双向操作，一个窗口改变，其余窗口接受） */
  1. 特殊值更新的后续操作(须判断值是否改变，如果未改变就不进行操作了)
    1. 更新 连锁id
      1. ... (参考：更新连锁信息)
    2. 更新 门店id
      1. ... (参考：更新门店信息)
/** 从localStorage恢复store机构信息 */
  1. 设置连锁信息 走api
  2. 设置品牌信息 走api
  3. 设置门店信息 走api
  4. 更新初始化路由信息 走api
/** 是否是连锁 */
/** 是否是门店 */
```

#### 连锁信息

```typescript
export interface ChainInfo {
  /** 连锁id */
  /** 连锁名称 */
  /** 连锁配置信息 */
  /** ... */
}

// api
/** 更新连锁信息(传入Partial<ChainInfo>)*/
  1. 设置连锁信息 走api
  2. 特殊值更新的后续操作(须判断值是否改变，如果未改变就不进行操作了)
    1. 更新 连锁id
      1. 重置品牌信息 走api
      2. 重置门店信息 走api
      3. 更新初始化路由信息 走api
/** 设置连锁信息(同步store/localStorage) */
/** 获取连锁信息(返回全部或者某个字段的值) */
/** 从接口更新连锁配置信息（可以尝试做成懒加载，获取值的时候去获取，看需求场景，因为可能不止一个接口） */
  1. 更新连锁信息 走api
/** 获取连锁配置(返回全部或者某个字段的值) */
```

#### 品牌信息

> 连锁下面可修改。门店下面是固定的。品牌信息是连锁和门店的服务商，不会单独存在。

```typescript
export interface BrandInfo {
  /** 品牌id */
  /** 品牌名称 */
  /** 品牌列表信息 */
  /** ... */
}

// api
/** 设置品牌信息(同步store/localStorage) */
/** 获取品牌信息(返回全部或者某个字段的值) */
/** 重置品牌信息 */
  1. 设置品牌信息 走api
/** 从接口更新品牌列表信息 */
/** 获取品牌列表信息 */
```

#### 门店信息

> 切换门店信息，需要更新品牌信息。

```typescript
export interface StoreInfo {
  /** 门店id */
  /** 门店名称 */
  /** 门店配置 */
  /** ... */
}

// api
/** 更新门店信息(传入Partial<StoreInfo>)*/
  1. 设置门店信息 走api
  2. 特殊值更新的后续操作(须判断值是否改变，如果未改变就不进行操作了)
    1. 更新 门店id
      1. 设置连锁信息 走api
      2. 设置品牌信息 走api
      3. 从接口更新门店配置信息 走api
      4. 更新初始化路由信息 走api
/** 设置门店信息(同步store/localStorage) */
/** 获取门店信息(返回全部或者某个字段的值) */
/** 重置门店信息 */
  1. 更新门店信息 走api

// 门店配置api
/** 从接口更新门店配置信息（可以尝试做成懒加载，获取值的时候去获取，看需求场景，因为可能不止一个接口） */
  1. 更新门店信息 走api
/** 获取门店配置信息(返回全部或者某个字段的值) */
```

### 路由信息

```typescript
export interface RouterInfo {
  /** 当前用户路由(用于渲染菜单) */
  /** 当前用户路由路径(用于路由拦截) */
  /** ... */
}
/** 更新路由信息(更具权限值获取) */
  1. 路由拦截 走api
/** 设置路由信息(同步store/localStorage) */
/** 路由拦截(判断当前页面是否有权限访问，如果没有则重定向页面，更新路由信息) */
```

<img
  src="https://gitee.com/Mochen_7/draw_io/raw/main/vuepress_note/v3_global_shelf.drawio.svg"
  onerror="this.src='https://raw.githubusercontent.com/Mochen07/draw_io/d8e6594f5f32db18162bc4382c8a338d99b3da8d/vuepress_note/v3_global_shelf.drawio.svg'"
  alt="vuex全局状态"
/>

## 页面组件

### 比较常用的组件

1. 选品牌
2. 选门店
3. 选商品
4. 重复的组件（针对纯UI组件需要收集整理下，放到组件库统一维护起来，比如：）
   1. table组件 (项目里面存在很多table组件很似雷同)
   2. input组件 (特别是对数字一些特殊格式的处理，比如：取整，保留小数位数，最大/最小范围等)

### 页面组件相似度收集

#### 功能性重叠

1. 优惠券逻辑以及弹窗（v2/v3写了两套，类似逻辑）
2. ...(类似的功能)

#### 代码重叠

components共约1553个，相似度组件约222项。

```typescript
[
  [
    "./src/v2_files/components/toolCards/OpenMealTimeCustom.old.vue",
    "./src/v2_files/components/toolCard/openMealTimeCustom.vue"
  ],
  [
    "./src/v2_files/components/printerTemplate/groupBuyingDish.vue",
    "./src/v2_files/components/printerTemplate/groupBuyingCash.vue"
  ],
  [
    "./src/v2_files/components/SelectShopTable/index.vue",
    "./src/pages/operationCenter/order_setting/components/SelectShopTable/index.vue"
  ],
  [
    "./src/pages/operationCenter/goodsManage/goodsLibrary/list/components/diningPosition/index.vue",
    "./src/pages/operationCenter/delivery_manage/components/dining_position/index.vue"
  ],
  [
    "./src/components/pages/report/field_setting_dialog/index.vue",
    "./src/components/pages/report/field_setting_dialog/index2.vue",
    "./src/pages/user_center/components/field_setting_dialog/index.vue"
  ],
  [
    "./src/v2_files/components/base/TableList.vue",
    "./src/components/base/TableList.vue"
  ],
  [
    "./src/v2_files/views/chain/minProgramManage/min_program_dress/components/my_config/my_preview/template_g_preview.vue",
    "./src/v2_files/views/chain/minProgramManage/min_program_dress/components/my_config/my_preview/template_b_preview.vue",
    "./src/v2_files/views/chain/minProgramManage/min_program_dress/components/my_config/my_preview/template_d_preview.vue",
    "./src/v2_files/views/chain/minProgramManage/min_program_dress/components/my_config/my_preview/template_c_preview.vue",
    "./src/v2_files/views/chain/minProgramManage/min_program_dress/components/my_config/my_preview/common_preview.vue",
    "./src/v2_files/views/chain/minProgramManage/min_program_dress/components/my_config/my_preview/template_f_preview.vue",
    "./src/v2_files/views/chain/minProgramManage/min_program_dress/components/my_config/my_preview/baking_preview.vue",
    "./src/v2_files/views/chain/minProgramManage/min_program_dress/components/my_config/my_preview/bcd_preview.vue",
    "./src/v2_files/views/chain/minProgramManage/min_program_dress/components/my_config/my_preview/template_e_preview.vue"
  ],
  [
    "./src/v2_files/components/orderCards/operation.vue",
    "./src/components/orderCards/operation.vue"
  ],
  [
    "./src/v2_files/components/goodsCards/SaleTimeList.vue",
    "./src/components/goodsCards/SaleTimeList.vue"
  ],
  [
    "./src/components/Marketing/activityRules/SelectGoodsDialog/index.vue",
    "./src/v2_files/components/Form/components/link_form_goods.vue"
  ],
  [
    "./src/v2_files/components/orderCards/BalanceFeeDetail.vue",
    "./src/components/orderCards/BalanceFeeDetail.vue"
  ],
  [
    "./src/components/goodsCards/GoodsClassify.vue",
    "./src/v2_files/components/goodsCards/GoodsClassify.vue"
  ],
  [
    "./src/components/base/BaseButton.vue",
    "./src/v2_files/components/base/BaseButton.vue"
  ],
  [
    "./src/v2_files/components/cards/AddMediaCard/index.vue",
    "./src/components/cards/AddMediaCard/index.vue"
  ],
  [
    "./src/v2_files/components/toolCard/formHeader.vue",
    "./src/v2_files/components/cards/FormHeader.vue",
    "./src/components/cards/FormHeader.vue"
  ],
  [
    "./src/v2_files/components/toolCards/ImageSelect/index.vue",
    "./src/components/toolCards/ImageSelect/index.vue"
  ],
  [
    "./src/v2_files/views/chain/minProgramManage/min_program_dress/components/home_config/home_preview/common_preview/index.vue",
    "./src/v2_files/views/chain/minProgramManage/min_program_dress/components/home_config/home_preview/template_b_preview/index.vue",
    "./src/v2_files/views/chain/minProgramManage/min_program_dress/components/home_config/home_preview/template_a_preview/index.vue",
    "./src/v2_files/views/chain/minProgramManage/min_program_dress/components/home_config/home_preview/template_c_preview/index.vue",
    "./src/v2_files/views/chain/minProgramManage/min_program_dress/components/home_config/home_preview/template_e_preview/index.vue"
  ],
  [
    "./src/v2_files/views/businessAnalysis/components/orderDiscountDetail/tableOrderByDiscount.vue",
    "./src/v2_files/views/businessAnalysis/components/orderDiscountDetail/tableOrder.vue",
    "./src/v2_files/views/businessAnalysis/components/orderDiscountDetail/v1/tableOrderByDiscount.vue",
    "./src/v2_files/views/businessAnalysis/components/orderDiscountDetail/v1/tableOrder.vue"
  ],
  [
    "./src/v2_files/components/printerTemplate/qttclPreview.vue",
    "./src/v2_files/components/printerTemplate/gktclPreview.vue"
  ],
  [
    "./src/pages/operationCenter/delivery_manage/components/goods_template/batchAppendGoods.vue",
    "./src/pages/operationCenter/delivery_manage/components/goods_template/batchUpdatePrice.vue"
  ],
  [
    "./src/components/staticCards/DataModule.vue",
    "./src/v2_files/components/staticCards/DataModule.vue"
  ],
  [
    "./src/v2_files/components/CouponCards/CouponTable.vue",
    "./src/components/CouponCards/CouponTable.vue",
    "./src/v2_files/components/tableCards/TableRender/index.vue"
  ],
  [
    "./src/v2_files/components/Form/components/link_form_goods_info.vue",
    "./src/components/Modal/SelectGoodsForClientDialog/goodsInfo.vue",
    "./src/components/Modal/SelectGoodsForCoupon/goodsInfo.vue",
    "./src/components/Marketing/activityRules/SelectGoodsDialog/goodsInfo.vue",
    "./src/components/Modal/SelectGoodsForCard/goodsInfo.vue"
  ],
  [
    "./src/v2_files/components/goodsCards/GoodsTabs.vue",
    "./src/components/goodsCards/GoodsTabs.vue"
  ],
  [
    "./src/v2_files/components/Modal/time.vue",
    "./src/components/Modal/time.vue"
  ],
  [
    "./src/pages/operationCenter/finance_manage/split_account/components/SelectShopDialog/index.vue",
    "./src/components/Modal/SelectShopDialog/select_brand_or_shop_dialog.vue",
    "./src/components/Modal/SelectShopDialog/index.vue",
    "./src/pages/operationCenter/operation_setting/components/SelectShopDialog/index.vue",
    "./src/components/Modal/SelectShopDialog/radio.vue"
  ],
  [
    "./src/v2_files/components/Modal/order/operationLogDialog.vue",
    "./src/components/Modal/order/operationLogDialog.vue"
  ],
  [
    "./src/v2_files/components/base/inputNumber.vue",
    "./src/components/base/inputNumber.vue"
  ],
  [
    "./src/v2_files/components/CouponCards/limitationTable.vue",
    "./src/components/CouponCards/limitationTable.vue"
  ],
  [
    "./src/v2_files/components/orderCards/schedule.vue",
    "./src/components/orderCards/schedule.vue"
  ],
  [
    "./src/components/Modal/SelectShopDialog/ShopInfo.vue",
    "./src/pages/operationCenter/finance_manage/split_account/components/SelectPaymentDialog/PaymentInfo.vue",
    "./src/pages/operationCenter/operation_setting/components/SelectShopDialog/ShopInfo.vue",
    "./src/pages/operationCenter/finance_manage/split_account/components/SelectShopDialog/ShopInfo.vue"
  ],
  [
    "./src/components/orderCards/goodsModal.vue",
    "./src/v2_files/components/orderCards/goodsModal.vue"
  ],
  [
    "./src/pages/operationCenter/delivery_manage/auth_manage/components/batch_set_print_backup_receipt/index.vue",
    "./src/pages/operationCenter/delivery_manage/auth_manage/components/batch_set_receipt_order/index.vue"
  ],
  [
    "./src/components/Activity/rules/components/inviterLinkCards.vue",
    "./src/v2_files/components/cards/inviterLinkCards.bak.vue",
    "./src/v2_files/components/cards/inviterLinkCards.vue"
  ],
  [
    "./src/components/Activity/rules/components/ExchangeDialog.vue",
    "./src/v2_files/components/pages/brandCoupon/ExchangeDialog.vue"
  ],
  [
    "./src/components/select_stall/select_popover.vue",
    "./src/v2_files/views/goodsManage/goodsLibrary/list/components/diningSlot/selectPopover.vue",
    "./src/v2_files/views/goodsManage/goodsLibrary/list/components/diningPosition/selectPopover.vue",
    "./src/pages/operationCenter/delivery_manage/components/dining_position/select_popover.vue",
    "./src/pages/operationCenter/goodsManage/goodsLibrary/list/components/diningPosition/selectPopover.vue",
    "./src/pages/operationCenter/goodsManage/goodsLibrary/list/components/diningSlot/selectPopover.vue"
  ],
  [
    "./src/components/element/date-picker/src/panel/week-range.vue",
    "./src/components/element/date-picker/src/panel/date-range.vue"
  ],
  [
    "./src/pages/operationCenter/delivery_manage/components/shop_relate_group_goods/batch_relate_goods.vue",
    "./src/pages/operationCenter/delivery_manage/components/group_relate_shop_goods/batch_relate_goods.vue"
  ],
  [
    "./src/v2_files/components/pages/businessAnalysis/business/PaymentData.vue",
    "./src/v2_files/components/pages/businessAnalysis/business/PaymentDataBak.vue"
  ],
  [
    "./src/v2_files/components/Modal/coupon/tableContainer.vue",
    "./src/components/Modal/coupon/tableContainer.vue"
  ],
  [
    "./src/v2_files/components/printerTemplate/bclGoodsList.vue",
    "./src/v2_files/components/printerTemplate/zclGoodsList.vue"
  ],
  [
    "./src/components/goodsCards/GoodsImageGroup.vue",
    "./src/v2_files/components/goodsCards/GoodsImageGroup.vue"
  ],
  [
    "./src/components/goodsCards/UploadCover.vue",
    "./src/v2_files/components/goodsCards/UploadCover.vue"
  ],
  [
    "./src/components/base/base_radio_group.vue",
    "./src/components/base/base_select.vue",
    "./src/components/base/base_group_select.vue",
    "./src/components/base/base_checkbox_group.vue"
  ],
  [
    "./src/components/Modal/SelectShopDialog/isolation.vue",
    "./src/v2_files/components/SelectBrand/isolation.vue"
  ],
  [
    "./src/v2_files/components/base/BaseSelect/BaseSelect.vue",
    "./src/components/base/BaseSelect/BaseSelect.vue"
  ],
  [
    "./src/v2_files/components/selectCards/SelectTree/index.vue",
    "./src/components/selectCards/SelectTree/index.vue"
  ],
  [
    "./src/v2_files/components/goodsCards/GoodsBatch.vue",
    "./src/components/goodsCards/GoodsBatch.vue"
  ],
  [
    "./src/components/orderCards/StoredRefundTables.vue",
    "./src/v2_files/components/orderCards/StoredRefundTables.vue"
  ],
  [
    "./src/v2_files/views/chain/minProgramManage/min_program_dress/components/modules/give_reward_dialog/index.vue",
    "./src/v2_files/views/chain/minProgramManage/min_program_dress/components/modules/birthday_write_dialog/index.vue"
  ],
  [
    "./src/v2_files/components/printerTemplate/goodsCoupon.vue",
    "./src/v2_files/components/printerTemplate/couponDetail.vue",
    "./src/v2_files/components/printerTemplate/goodsCouponDetail.vue"
  ],
  [
    "./src/v2_files/components/printerTemplate/gklPreview.vue",
    "./src/v2_files/components/printerTemplate/gklPlacePreview.vue"
  ],
  [
    "./src/components/Activity/components/ActivityTabLogsSearch.vue",
    "./src/components/Activity/components/CouponTabLogSearch.vue"
  ],
  [
    "./src/v2_files/components/printerTemplate/placeDiscountFee.vue",
    "./src/v2_files/components/printerTemplate/placeDiscount.vue",
    "./src/v2_files/components/printerTemplate/placeDiscountDetail.vue"
  ],
  [
    "./src/v2_files/components/orderCards/PackageFeeInfo.vue",
    "./src/components/orderCards/PackageFeeInfo.vue"
  ],
  [
    "./src/v2_files/components/pages/brandCoupon/ExchangeDownload.vue",
    "./src/components/Activity/rules/components/ExchangeDownload.vue"
  ],
  [
    "./src/v2_files/components/pages/invitation/BrandPromoterPage.vue",
    "./src/v2_files/components/pages/invitation/StorePromoterPage.vue"
  ],
  [
    "./src/v2_files/components/tableCards/TableList/TableListEasy.vue",
    "./src/components/tableCards/TableList/TableListEasy.vue",
    "./src/pages/operationCenter/finance_manage/split_account/components/tableCards/TableList/TableListEasy.vue"
  ],
  [
    "./src/pages/operationCenter/keyAccount/clientManage/discountStrategy/components/GoodsTableList/activityClash.vue",
    "./src/components/pages/salesPromotion/activityClash.vue",
    "./src/components/Marketing/activityClash.vue"
  ],
  [
    "./src/components/CouponCards/historyRecord.vue",
    "./src/v2_files/components/CouponCards/historyRecord.vue"
  ],
  [
    "./src/components/orderCards/UpPayMethodLogs.vue",
    "./src/v2_files/components/orderCards/UpPayMethodLogs.vue"
  ],
  [
    "./src/pages/operationCenter/delivery_manage/components/create_goods/partner_id/index.vue",
    "./src/pages/operationCenter/components/packageDetail/components/ThirdId2.vue"
  ],
  [
    "./src/components/CouponCards/textTextarea.vue",
    "./src/v2_files/components/CouponCards/textTextarea.vue"
  ],
  [
    "./src/components/CouponCards/couponCards.vue",
    "./src/v2_files/components/CouponCards/couponCards.vue"
  ],
  [
    "./src/v2_files/components/SelectShopTree/index.vue",
    "./src/v2_files/components/SelectShop/index.vue"
  ],
  [
    "./src/v2_files/views/chain/minProgramManage/min_program_dress/components/modules/invite_friend/index.vue",
    "./src/v2_files/views/chain/minProgramManage/min_program_dress/components/modules/member_info/index.vue"
  ],
  [
    "./src/v2_files/components/goodsCards/CoverBox.vue",
    "./src/components/goodsCards/CoverBox.vue"
  ],
  [
    "./src/components/Modal/cancelCoupon.vue",
    "./src/v2_files/components/Modal/cancelCoupon.vue"
  ],
  [
    "./src/pages/operationCenter/delivery_manage/components/batch_operate/batch_prop_dialog/mei_tuan/index.vue",
    "./src/pages/operationCenter/delivery_manage/components/batch_operate/batch_prop_dialog/e_le_me/index.vue"
  ],
  [
    "./src/v2_files/components/goodsCards/PopoverBarcode.vue",
    "./src/components/goodsCards/PopoverBarcode.vue"
  ],
  [
    "./src/pages/operationCenter/delivery_manage/components/goods_import_or_copy_desc_dialog/e_le_me.vue",
    "./src/pages/operationCenter/delivery_manage/components/goods_import_or_copy_desc_dialog/mei_tuan.vue"
  ],
  [
    "./src/v2_files/components/goodsCards/SaleTag/tagLocation.vue",
    "./src/v2_files/components/goodsCards/SaleTag/tagColor.vue",
    "./src/components/goodsCards/SaleTag/tagColor.vue",
    "./src/components/goodsCards/SaleTag/tagLocation.vue"
  ],
  [
    "./src/components/Modal/orderDetail.vue",
    "./src/v2_files/components/Modal/orderDetail.vue"
  ],
  [
    "./src/components/Modal/SelectGoodsForClientDialog/index.vue",
    "./src/components/Modal/SelectGoodsForCard/index.vue",
    "./src/components/Marketing/activityRules/goodsSaleRule/goodsDialog.vue",
    "./src/components/pages/advertising/components/link_form_goods.vue"
  ],
  [
    "./src/components/pages/report/selectShop/shop_or_brand.vue",
    "./src/components/pages/report/selectShop/all.vue",
    "./src/components/pages/report/selectShop/index.vue"
  ],
  [
    "./src/v2_files/components/Modal/batch.vue",
    "./src/components/Modal/batch.vue"
  ],
  [
    "./src/pages/operationCenter/keyAccount/clientManage/discountStrategy/components/GoodsTableList/selectDrop.vue",
    "./src/components/Marketing/activityRules/selectDrop.vue"
  ],
  [
    "./src/v2_files/components/base/BaseRadio/index.vue",
    "./src/components/base/BaseRadio/index.vue"
  ],
  [
    "./src/v2_files/components/SelectTree/index.vue",
    "./src/v2_files/components/SelectTree/index.remote.vue",
    "./src/v2_files/components/SelectTree/index.page.vue",
    "./src/v2_files/components/SelectTree/index.str.vue"
  ],
  [
    "./src/v2_files/components/orderCards/DishesInfo.vue",
    "./src/components/orderCards/DishesInfo.vue"
  ],
  [
    "./src/components/orderCards/FreeGoodsBtn.vue",
    "./src/v2_files/components/orderCards/FreeGoodsBtn.vue"
  ],
  [
    "./src/v2_files/components/cards/ImageHoverDefaultCard.vue",
    "./src/components/cards/ImageHoverDefaultCard.vue"
  ],
  [
    "./src/v2_files/components/cards/CountInput.vue",
    "./src/components/cards/CountInput.vue"
  ],
  [
    "./src/components/pages/salesPromotion/activityPublishClashDialog.vue",
    "./src/components/pages/advertising/activity_publish_clash_dialog.vue"
  ],
  [
    "./src/v2_files/components/Modal/searchInt.vue",
    "./src/components/base/searchInt.vue"
  ],
  [
    "./src/components/base/CustomTable.vue",
    "./src/v2_files/components/base/CustomTable.vue"
  ],
  [
    "./src/v2_files/components/printerTemplate/crossTime.vue",
    "./src/v2_files/components/printerTemplate/sideTime.vue"
  ],
  [
    "./src/pages/operationCenter/delivery_manage/components/goods_template/components/edit_goods_prop/edit_sale_status_keep.vue",
    "./src/pages/operationCenter/goodsManage/menuTemplate/children/components/edit_goods_prop/edit_sale_status_keep.vue"
  ],
  [
    "./src/v2_files/components/staticCards/StaticTitle.vue",
    "./src/components/staticCards/StaticTitle.vue"
  ],
  [
    "./src/v2_files/components/Modal/MessageDialog/index.vue",
    "./src/components/Modal/MessageDialog/index.vue"
  ],
  [
    "./src/v2_files/components/Modal/ImgCropper/previewImgOfVertical.vue",
    "./src/components/Modal/ImgCropper/previewImgOfVertical.vue"
  ],
  [
    "./src/components/goodsCards/BannerBox.vue",
    "./src/v2_files/components/goodsCards/BannerBox.vue"
  ],
  [
    "./src/v2_files/components/cards/noData.vue",
    "./src/components/cards/noData.vue"
  ],
  [
    "./src/v2_files/components/Media/select_image_dialog.vue",
    "./src/components/Media/select_image_dialog.vue"
  ],
  [
    "./src/v2_files/components/orderCards/FormatDiscountRecords.vue",
    "./src/components/orderCards/FormatDiscountRecords.vue"
  ],
  [
    "./src/v2_files/components/staticCards/TableTotal.vue",
    "./src/components/staticCards/TableTotal.vue"
  ],
  [
    "./src/v2_files/components/goodsCards/PackageModule.vue",
    "./src/components/goodsCards/PackageModule.vue"
  ],
  [
    "./src/components/cards/breadcrumbCard.vue",
    "./src/v2_files/components/cards/breadcrumbCard.vue"
  ],
  [
    "./src/components/staticCards/TipGreen.vue",
    "./src/v2_files/components/staticCards/TipGreen.vue"
  ],
  [
    "./src/pages/operationCenter/delivery_manage/components/batch_operate/batch_package_fee_dialog.vue",
    "./src/pages/operationCenter/delivery_manage/components/batch_operate/batch_sale_time_dialog.vue"
  ],
  [
    "./src/components/goodsCards/SaleTag/index.vue",
    "./src/v2_files/components/goodsCards/SaleTag/index.vue"
  ],
  [
    "./src/components/Activity/ActivityCalendar.vue",
    "./src/components/Marketing/activity_calendar.vue",
    "./src/components/Marketing/activityCalendar.vue"
  ],
  [
    "./src/components/pages/advertising/activity_clash_dialog.vue",
    "./src/components/Activity/clash_dialog.vue",
    "./src/components/pages/salesPromotion/activityClashDialog.vue"
  ],
  [
    "./src/v2_files/views/chain/minProgramManage/min_program_dress/components/modules/focus_point/template_c.vue",
    "./src/v2_files/views/chain/minProgramManage/min_program_dress/components/modules/focus_point/template_d.vue"
  ],
  [
    "./src/v2_files/components/Modal/order/version1/orderModal.vue",
    "./src/components/Modal/order/version1/orderModal.vue"
  ],
  [
    "./src/v2_files/components/goodsCards/goods_price_setting.vue",
    "./src/components/goodsCards/goods_price_setting.vue"
  ],
  [
    "./src/v2_files/components/printerTemplate/shopMobile.vue",
    "./src/v2_files/components/printerTemplate/shopWx.vue"
  ],
  [
    "./src/v2_files/components/cards/SimpleTable.vue",
    "./src/components/cards/SimpleTable.vue"
  ],
  [
    "./src/v2_files/components/selectCards/SelectTree/tree/tree.vue",
    "./src/components/selectCards/SelectTree/tree/tree.vue"
  ],
  [
    "./src/components/Modal/ImgCropper/previewImgOfHorizontal.vue",
    "./src/v2_files/components/Modal/ImgCropper/previewImgOfHorizontal.vue"
  ],
  [
    "./src/v2_files/components/CouponCards/stats/ActivityOverview.vue",
    "./src/components/CouponCards/stats/ActivityOverview.vue"
  ],
  [
    "./src/v2_files/components/cards/StoreCard.vue",
    "./src/components/cards/StoreCard.vue"
  ],
  [
    "./src/v2_files/components/staticCards/DateSelect.vue",
    "./src/components/staticCards/DateSelect.vue"
  ],
  [
    "./src/v2_files/components/Modal/delTipConfirmModal.vue",
    "./src/components/Modal/delTipConfirmModal.vue"
  ],
  [
    "./src/components/base/BaseCheckBox/BaseCheckBox.vue",
    "./src/v2_files/components/base/BaseCheckBox/BaseCheckBox.vue"
  ],
  [
    "./src/components/orderCards/DiscountNormal.vue",
    "./src/v2_files/components/orderCards/DiscountNormal.vue"
  ],
  [
    "./src/v2_files/components/SelectBrand/SelectBrandBox.vue",
    "./src/v2_files/components/SelectBrandLocal/SelectBrandBox.vue"
  ],
  [
    "./src/v2_files/components/orderCards/PayMethodNormal.vue",
    "./src/components/orderCards/PayMethodNormal.vue"
  ],
  [
    "./src/v2_files/views/goodsManage/goodsLibrary/list/components/GoodsListEditItem/index.vue",
    "./src/pages/operationCenter/goodsManage/goodsLibrary/list/components/GoodsListEditItem/index.vue"
  ],
  [
    "./src/v2_files/components/Modal/coupon/addCouponDialog.vue",
    "./src/components/Modal/coupon/addCouponDialog.vue"
  ],
  [
    "./src/components/goodsCards/StockSectionEdit.vue",
    "./src/v2_files/components/goodsCards/StockSectionEdit.vue"
  ],
  [
    "./src/v2_files/components/Modal/delModal.vue",
    "./src/components/Modal/delModal.vue"
  ],
  [
    "./src/components/Modal/order/operationLogDetailDialog.vue",
    "./src/v2_files/components/Modal/order/operationLogDetailDialog.vue"
  ],
  [
    "./src/v2_files/components/Modal/video.vue",
    "./src/components/Modal/video.vue"
  ],
  [
    "./src/components/goodsCards/CoverBottomCard.vue",
    "./src/v2_files/components/goodsCards/CoverBottomCard.vue"
  ],
  [
    "./src/pages/operationCenter/delivery_manage/components/goods_template/components/edit_goods_prop/edit_goods_name.vue",
    "./src/pages/operationCenter/goodsManage/menuTemplate/children/components/edit_goods_prop/edit_goods_name.vue"
  ],
  [
    "./src/pages/operationCenter/delivery_manage/components/batch_operate/batch_weight_sku_dialog/e_le_me/index.vue",
    "./src/pages/operationCenter/delivery_manage/components/batch_operate/batch_weight_sku_dialog/mei_tuan/index.vue"
  ],
  [
    "./src/components/CouponCards/newCouponCard.vue",
    "./src/v2_files/components/CouponCards/newCouponCard.vue"
  ],
  [
    "./src/v2_files/components/goodsCards/GoodsLayout.vue",
    "./src/components/goodsCards/GoodsLayout.vue"
  ],
  [
    "./src/v2_files/components/Modal/order/placeOrderTipDialog.vue",
    "./src/components/Modal/order/placeOrderTipDialog.vue"
  ],
  [
    "./src/components/Modal/SelectPropertyDialog/propertySelectedTable.vue",
    "./src/v2_files/components/Modal/SelectPropertyDialog/propertySelectedTable.vue"
  ],
  [
    "./src/v2_files/components/goodsCards/PenTapSection.vue",
    "./src/components/goodsCards/PenTapSection.vue"
  ],
  [
    "./src/components/pages/report/query_form/select_business_date_popover.vue",
    "./src/components/pages/salesPromotion/select_business_date_popover.vue"
  ],
  [
    "./src/components/orderCards/foot.vue",
    "./src/v2_files/components/orderCards/foot.vue"
  ],
  [
    "./src/components/goodsCards/SidegoodsModuleV1.vue",
    "./src/v2_files/components/goodsCards/SidegoodsModuleV1.vue"
  ],
  [
    "./src/pages/operationCenter/finance_manage/split_account/components/pageDialog/bill_rep_manual.vue",
    "./src/pages/operationCenter/finance_manage/split_account/components/pageDialog/refund_rep_manual.vue"
  ],
  [
    "./src/v2_files/components/orderCards/historyOrder.vue",
    "./src/components/orderCards/historyOrder.vue"
  ],
  [
    "./src/v2_files/components/Modal/addGoods.vue",
    "./src/components/Modal/addGoods.vue"
  ],
  [
    "./src/components/Modal/ImgCropper/index.vue",
    "./src/v2_files/components/Modal/ImgCropper/index.vue"
  ],
  [
    "./src/v2_files/components/SearchInput/SearchInput.vue",
    "./src/components/SearchInput/SearchInput.vue"
  ],
  [
    "./src/v2_files/views/goodsManage/goodsLibrary/list/components/diningSlot/index.vue",
    "./src/pages/operationCenter/goodsManage/goodsLibrary/list/components/diningSlot/index.vue"
  ],
  [
    "./src/v2_files/views/goodsManage/goodsLibrary/list/components/GoodsListViewItem/index.vue",
    "./src/pages/operationCenter/goodsManage/goodsLibrary/list/components/GoodsListViewItem/index.vue"
  ],
  [
    "./src/components/CouponCards/CouponDialog.vue",
    "./src/v2_files/components/CouponCards/CouponDialog.vue"
  ],
  [
    "./src/v2_files/components/printerTemplate/goodsListPlace.vue",
    "./src/v2_files/components/printerTemplate/goodsList.vue"
  ],
  [
    "./src/components/BasePagination/BasePagination.vue",
    "./src/v2_files/components/base/BasePagination/BasePagination.vue"
  ],
  [
    "./src/v2_files/components/Modal/image.vue",
    "./src/components/Modal/image.vue"
  ],
  [
    "./src/components/orderCards/detailPrice.vue",
    "./src/v2_files/components/orderCards/detailPrice.vue"
  ],
  [
    "./src/v2_files/components/orderCards/goodsInfo.vue",
    "./src/components/orderCards/goodsInfo.vue"
  ],
  [
    "./src/components/SvgIcon/SvgIcon.vue",
    "./src/v2_files/components/base/SvgIcon/index.vue"
  ],
  [
    "./src/v2_files/components/CouponCards/timeDateSel.vue",
    "./src/components/CouponCards/timeDateSel.vue",
    "./src/components/Marketing/activityRules/timeDateSel.vue"
  ],
  [
    "./src/v2_files/components/Modal/SelectRelevantTableDialog/tableInfo.vue",
    "./src/components/Modal/SelectRelevantTableDialog/tableInfo.vue",
    "./src/components/Marketing/activityRules/SelectRelevantTableDialog/tableInfo.vue"
  ],
  [
    "./src/v2_files/components/cards/CountDownTime/index.vue",
    "./src/components/cards/CountDownTime/index.vue"
  ],
  [
    "./src/components/pages/salesPromotion/activityReboot.vue",
    "./src/components/pages/advertising/activity_reboot.vue"
  ],
  [
    "./src/components/pages/advertising/form_link_dialog.vue",
    "./src/v2_files/components/Form/form_link_dialog.vue"
  ],
  [
    "./src/v2_files/views/businessAnalysis/components/orderDiscountDetail/tablePlaceOrderByDiscount.vue",
    "./src/v2_files/views/businessAnalysis/components/orderDiscountDetail/tablePlaceOrder.vue"
  ],
  [
    "./src/components/base/BaseOrderHeader.vue",
    "./src/components/Modal/coupon/couponHeader.vue",
    "./src/v2_files/components/Modal/coupon/couponHeader.vue"
  ],
  [
    "./src/pages/operationCenter/delivery_manage/components/shop_relate_group_goods/history_detail_dialog.vue",
    "./src/pages/operationCenter/delivery_manage/components/group_relate_shop_goods/history_detail_dialog.vue"
  ],
  [
    "./src/v2_files/components/Modal/addCouponFromLibrary.vue",
    "./src/v2_files/components/Modal/brand/addCouponFromLibrary.vue"
  ],
  [
    "./src/components/base/BaseBtnGroup/BaseBtnGroup.vue",
    "./src/v2_files/components/base/BaseBtnGroup/BaseBtnGroup.vue"
  ],
  [
    "./src/v2_files/components/base/BaseSkewed.vue",
    "./src/components/base/BaseSkewed.vue"
  ],
  [
    "./src/v2_files/components/Conditions/index.vue",
    "./src/components/Conditions/index.vue"
  ],
  [
    "./src/v2_files/components/Modal/coupon/newCommentCouponDetailDialog.vue",
    "./src/components/Modal/coupon/newCommentCouponDetailDialog.vue"
  ],
  [
    "./src/components/base/base_tooltip.vue",
    "./src/components/base/base_tab.vue",
    "./src/components/base/BasePageHeader.vue"
  ],
  [
    "./src/components/selectCards/SelectTree/tree/tree-node.vue",
    "./src/v2_files/components/selectCards/SelectTree/tree/tree-node.vue"
  ],
  [
    "./src/v2_files/components/goodsCards/GoodsTabsSub.vue",
    "./src/components/goodsCards/GoodsTabsSub.vue"
  ],
  [
    "./src/v2_files/components/base/BaseTimePicker/BaseTimePicker.vue",
    "./src/v2_files/components/base/BaseDatePicker/BaseDatePicker.vue",
    "./src/components/BaseDatePicker/BaseDatePicker.vue",
    "./src/components/base/BaseDatePicker/BaseDatePicker.vue"
  ],
  [
    "./src/v2_files/components/orderCards/totalPrice.vue",
    "./src/components/orderCards/totalPrice.vue"
  ],
  [
    "./src/components/Media/custom_crop_dialog.vue",
    "./src/v2_files/components/Media/custom_crop_dialog.vue"
  ],
  [
    "./src/components/Activity/rules/components/GenerateDialog.vue",
    "./src/v2_files/components/pages/brandCoupon/GenerateDialog.vue"
  ],
  [
    "./src/components/goodsCards/UploadBanner.vue",
    "./src/v2_files/components/goodsCards/UploadBanner.vue"
  ],
  [
    "./src/components/Modal/exportCmdModal.vue",
    "./src/v2_files/components/Modal/exportCmdModal.vue"
  ],
  [
    "./src/components/base/BaseDateTimePicker/BaseDateTimePicker.vue",
    "./src/components/BaseDateTimePicker/BaseDateTimePicker.vue",
    "./src/v2_files/components/base/BaseDateTimePicker/BaseDateTimePicker.vue"
  ],
  [
    "./src/v2_files/components/goodsCards/GoodsSearch.vue",
    "./src/components/goodsCards/GoodsSearch.vue"
  ],
  [
    "./src/components/base/BaseFilterTree.vue",
    "./src/v2_files/components/base/BaseFilterTree.vue"
  ],
  [
    "./src/v2_files/components/toolCards/SaleTimeCustom/index.vue",
    "./src/components/toolCards/SaleTimeCustom/index.vue"
  ],
  [
    "./src/pages/operationCenter/goodsManage/menuTemplate/children/components/edit_goods_prop/edit_sale_price.vue",
    "./src/pages/operationCenter/goodsManage/menuTemplate/children/components/edit_goods_prop/edit_vip_price.vue",
    "./src/pages/operationCenter/delivery_manage/components/goods_template/components/edit_goods_prop/edit_vip_price.vue",
    "./src/pages/operationCenter/delivery_manage/components/goods_template/components/edit_goods_prop/edit_sale_price.vue"
  ],
  [
    "./src/v2_files/components/goodsCards/PropertyModule/index.vue",
    "./src/v2_files/components/goodsCards/SidegoodsModule.vue",
    "./src/components/goodsCards/SidegoodsModule.vue",
    "./src/components/goodsCards/PropertyModule/index.vue"
  ],
  [
    "./src/components/orderCards/StoredRefundTable.vue",
    "./src/v2_files/components/orderCards/StoredRefundTable.vue"
  ],
  [
    "./src/v2_files/components/goodsCards/UploadTag.vue",
    "./src/components/goodsCards/UploadTag.vue"
  ],
  [
    "./src/pages/operationCenter/goodsManage/goodsLibrary/list/components/diningPosition/selectGroup.vue",
    "./src/v2_files/views/goodsManage/goodsLibrary/list/components/diningPosition/selectGroup.vue",
    "./src/pages/operationCenter/goodsManage/goodsLibrary/list/components/diningSlot/selectGroup.vue",
    "./src/components/select_stall/select_group.vue",
    "./src/v2_files/views/goodsManage/goodsLibrary/list/components/diningSlot/selectGroup.vue",
    "./src/pages/operationCenter/delivery_manage/components/dining_position/select_group.vue"
  ],
  [
    "./src/v2_files/components/goodsCards/GoodsClassifyItem.vue",
    "./src/components/goodsCards/GoodsClassifyItem.vue"
  ],
  [
    "./src/components/staticCards/TitleBlack.vue",
    "./src/components/staticCards/ExplainTitle.vue",
    "./src/v2_files/components/staticCards/ExplainTitle.vue",
    "./src/v2_files/components/staticCards/TitleBlack.vue"
  ],
  [
    "./src/components/Modal/decorationSettings/index.vue",
    "./src/v2_files/components/Modal/decorationSettings/index.vue"
  ],
  [
    "./src/components/Modal/orderModal.vue",
    "./src/v2_files/components/Modal/orderModal.vue"
  ],
  [
    "./src/v2_files/views/chain/minProgramManage/min_program_dress/components/home_config/home_preview/template_g_preview/index.vue",
    "./src/v2_files/views/chain/minProgramManage/min_program_dress/components/home_config/home_preview/template_f_preview/index.vue"
  ],
  [
    "./src/v2_files/components/orderCards/historyOrderTable.vue",
    "./src/components/orderCards/historyOrderTable.vue"
  ],
  [
    "./src/pages/operationCenter/delivery_manage/components/batch_operate/batch_weight_sku_dialog/e_le_me/sku_item.vue",
    "./src/pages/operationCenter/delivery_manage/components/batch_operate/batch_weight_sku_dialog/mei_tuan/sku_item.vue"
  ],
  [
    "./src/v2_files/components/orderCards/BalancePayDetail.vue",
    "./src/components/orderCards/BalancePayDetail.vue"
  ],
  [
    "./src/v2_files/components/selectCards/SelectedSearch/index.vue",
    "./src/components/selectCards/SelectedSearch/index.vue"
  ],
  [
    "./src/pages/operationCenter/delivery_manage/components/goods_template/components/edit_goods_prop/edit_stock.vue",
    "./src/pages/operationCenter/goodsManage/menuTemplate/children/components/edit_goods_prop/edit_stock.vue"
  ],
  [
    "./src/components/goodsCards/GoodsDesc.vue",
    "./src/v2_files/components/goodsCards/GoodsDesc.vue"
  ],
  [
    "./src/v2_files/components/Modal/tipsModal.vue",
    "./src/components/Modal/tipsModal.vue"
  ],
  [
    "./src/v2_files/components/CouponCards/couponCover.vue",
    "./src/components/CouponCards/couponCover.vue"
  ],
  [
    "./src/pages/operationCenter/goodsManage/menuTemplate/children/components/edit_goods_prop/copy_goods_id.vue",
    "./src/pages/operationCenter/delivery_manage/components/goods_template/components/edit_goods_prop/copy_goods_id.vue"
  ],
  [
    "./src/components/Modal/addStore.vue",
    "./src/v2_files/components/Modal/addStore.vue"
  ],
  [
    "./src/pages/operationCenter/order_setting/components/EditDesc/index.vue",
    "./src/v2_files/components/EditDesc/index.vue"
  ],
  [
    "./src/components/SelectShopDialog/ShopInfo.vue",
    "./src/components/Marketing/activityRules/SelectShopDialog/ShopInfo.vue",
    "./src/v2_files/components/Modal/SelectShopDialog/ShopInfo.vue"
  ],
  [
    "./src/v2_files/components/printerTemplate/hclPreview.vue",
    "./src/v2_files/components/printerTemplate/pclPreview.vue"
  ],
  [
    "./src/v2_files/components/toolCards/charts/MixChart.vue",
    "./src/components/toolCards/charts/MixChart.vue"
  ],
  [
    "./src/components/Modal/ImgCropper/imgCropperForm.vue",
    "./src/v2_files/components/Modal/ImgCropper/imgCropperForm.vue"
  ],
  [
    "./src/components/goodsCards/SetGoodsAttributes.vue",
    "./src/v2_files/components/goodsCards/SetGoodsAttributes.vue"
  ],
  [
    "./src/v2_files/components/goodsCards/StockSectionView.vue",
    "./src/components/goodsCards/StockSectionView.vue"
  ],
  [
    "./src/components/goodsCards/CoverCard/index.vue",
    "./src/v2_files/components/goodsCards/CoverCard/index.vue"
  ],
  [
    "./src/v2_files/components/goodsCards/print_info/printDescTips.vue",
    "./src/components/goodsCards/print_info/printDescTips.vue"
  ],
  [
    "./src/v2_files/components/toolCards/charts/Keyboard.vue",
    "./src/components/toolCards/charts/Keyboard.vue"
  ],
  [
    "./src/components/base/BaseTabs.vue",
    "./src/v2_files/components/base/BaseTabs.vue"
  ],
  [
    "./src/components/Modal/newOrderDetail.vue",
    "./src/v2_files/components/Modal/newOrderDetail.vue"
  ],
  [
    "./src/components/CouponCards/CouponLib.vue",
    "./src/v2_files/components/CouponCards/CouponLib.vue"
  ],
  [
    "./src/components/goodsCards/ThirdId.vue",
    "./src/v2_files/components/goodsCards/ThirdId.vue"
  ],
  [
    "./src/v2_files/components/Marketing/peopleInfo.vue",
    "./src/v2_files/components/Marketing/brand/peopleInfo.vue"
  ],
  [
    "./src/components/pages/report/query_form/form_item_inline.vue",
    "./src/pages/user_center/components/query_form/form_item_inline.vue"
  ],
  [
    "./src/v2_files/components/Modal/coupon/commentCouponDetailDialog.vue",
    "./src/components/Modal/coupon/commentCouponDetailDialog.vue"
  ],
  [
    "./src/v2_files/components/orderCards/header.vue",
    "./src/components/orderCards/header.vue"
  ],
  [
    "./src/components/orderCards/UserInfo.vue",
    "./src/v2_files/components/orderCards/UserInfo.vue"
  ],
  [
    "./src/v2_files/components/printerTemplate/thirdDeliveryCustomerPreview.vue",
    "./src/v2_files/components/printerTemplate/thirdDeliveryBusinessPreview.vue"
  ],
  [
    "./src/v2_files/components/Form/form_link_select.vue",
    "./src/v2_files/views/chain/minProgramManage/min_program_dress/components/modules/small_pic_ad/select_link.vue"
  ],
  [
    "./src/components/orderCards/version1/RetireGoodsTable.vue",
    "./src/v2_files/components/orderCards/version1/RetireGoodsTable.vue"
  ],
  [
    "./src/components/goodsCards/GoodsTitle.vue",
    "./src/v2_files/components/goodsCards/GoodsTitle.vue"
  ],
  [
    "./src/components/Marketing/activityRules/SelectShopDialog/index.vue",
    "./src/v2_files/components/Modal/SelectShopDialog/SelectShopDialog.vue"
  ],
  [
    "./src/components/orderCards/DineNumber.vue",
    "./src/v2_files/components/orderCards/DineNumber.vue"
  ],
  [
    "./src/components/element/date-picker/src/basic/date-table.vue",
    "./src/components/element/date-picker/src/basic/week-range-table.vue"
  ],
  [
    "./src/v2_files/components/orderCards/version1/operation.vue",
    "./src/components/orderCards/version1/operation.vue"
  ]
]
```