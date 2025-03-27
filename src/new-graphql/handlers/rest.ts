import {rest} from "msw";
import { getEnvConfig } from "../../common/utils/env";

const mockPermission: Record<string, any>= {
    instapay: {
        view: true
    },
    super_app_benefits: {
        view: true
    },
    super_app_home: {
        view: true
    },
    super_app_wallet: {
        view: true
    },
    super_app_settings: {
        view: true
    },
    super_app_cashback: {
        view: true
    },
    super_app_benefits_featured_offers: {
        view: true
    },
    super_app_cashback_categories: {
        view: true
    },
    super_app_instore_offer: {
        view: true
    },
    eben_dev_hero_dollar_payment: {
        view: true
    },
    eben_cashback_store_list: {
        view: true
    },
    pillar_money: {
        view: true
    },
    pillar_benefits: {
        view: true
    },
    eben_money_pillar_black_list: {
        view: true
    },
    eben_benefits_pillar_black_list: {
        view: false
    },
    eben_store_popular_list: {
        view: true
    },
    eben_store_buy_again_carousel: {
        view: true
    },
    super_choice_swag_v2: {
        view: true
    },
    toggle_mega_deals_mvp_cta: {
        view: true
    },
    toggle_mega_deals_communities_ctas: {
        view: true
    },
    eben_paysplit_experiment_group_a: {
        view: true
    },
    eben_paysplit_experiment_group_b: {
        view: true
    },
    eben_paysplit_experiment_group_c: {
        view: true
    },
    eben_service_fee: {
        view: true
    },
    eben_spend_hero_dollars_on_swag_card: {
        view: true
    },
    eben_stash: {
        view: true
    },
    eben_money_scheduled_payment: {
        view: true
    },
    eben_whitelisted_uk_money: {
        view: true
    },
    eben_whitelisted_uk_benefits: {
        view: true
    },
    instapay_2_alpha: {
        view: true
    },
    super_salary_sacrifice: {
        view: true
    },
    super_consent_swag: {
        view: true
    },
    custom_fund_asset_swag: {
        view: true
    },
    super_consolidation: {
        view: true
    },
    benefits_bill_streaming_v2: {
        view: true
    },
    benefits_se_offer_tiles: {
        view: true
    },
    benefits_force_update: {
        view: true
    },
    benefits_store_app_uk: {
        view: true
    },
    bill_streaming_waitlist: {
        view: true
    },
    benefits_pillar_homepage: {
        view: true
    },
    international_benefits_refused: {
        view: false
    },
    benefits_xmas23_cashback: {
        view: true
    },
    hero_points: {
        view: true
    },
    benefits_cashback_v2: {
        view: true
    },
    skip_mega_deals_survey: {
        view: true
    },
    eben_swag_interest_bearing_account_experiment: {
        view: true
    },
    eben_payee_address_book: {
        view: true
    },
    benefits_ia_v2: {
        view: true
    },
    benefits_cashback_multiple_locations: {
        view: true
    },
    health_insurance_waitlist: {
        view: true
    },
    rosters_instapay_experiment: {
        view: true
    },
    timesheets_instapay_experiment: {
        view: true
    },
    custom_survey_instapay_experiment: {
        view: true
    },
}
export const restHandlers = [
    rest.get(getEnvConfig().MAIN_APP_ENDPOINT+'/api/v2/organisations/:orgId/members/:memberId/permission', (_, res, ctx) => {
        return res(ctx.status(200),ctx.delay(100),ctx.json(mockPermission))
    })
]
