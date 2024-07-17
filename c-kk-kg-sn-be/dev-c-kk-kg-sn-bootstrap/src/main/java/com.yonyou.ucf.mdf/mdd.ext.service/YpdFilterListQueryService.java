package com.yonyou.ucf.mdf.mdd.ext.service;

import com.yonyou.ucf.mdd.ext.consts.Constants;
import com.yonyou.ucf.mdd.ext.model.BillContext;
import com.yonyou.ucf.mdd.plugin.base.QuerySchemaExecutorPlugin;
import org.imeta.core.model.Entity;
import org.imeta.orm.schema.QueryField;
import org.imeta.orm.schema.QuerySchema;
import java.util.ArrayList;
import java.util.List;

/**
 * @author liangrch@yonyou.com
 * @version 1.0
 * @createTime 2022/9/19 19:31
 * @description
 */
public class YpdFilterListQueryService implements QuerySchemaExecutorPlugin {
    @Override
    public void extendQuerySchema(Entity entity, QuerySchema querySchema, BillContext billContext) {
        Object filterFieldName = billContext.getCusMapValue(Constants.MDD_FILTER_COLUMN_NAME);
        if (filterFieldName == null) {
            return;
        }
        String filterFieldNamestr = String.valueOf(filterFieldName);
        List<QueryField> selectFields = new ArrayList<QueryField>();
        selectFields.add(new QueryField("1", "", "distinct"));
        String filterItemName = (String) billContext.getCusMapValue(Constants.MDD_FILTER_ITEM_NAME);
        selectFields.add(new QueryField(filterFieldNamestr, filterItemName));
        querySchema.selectFields(selectFields);
        querySchema.groupbyFields(null);
        querySchema.queryOrderbys(null);
    }

    @Override
    public int order() {
        return 9999;
    }
}
