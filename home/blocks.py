from wagtail import blocks
from wagtail.images.blocks import ImageChooserBlock

class HeroBlock(blocks.StructBlock):
    badge_text = blocks.CharBlock(required=True, max_length=50)
    badge_icon = blocks.CharBlock(required=True, max_length=50)  # store icon name or component
    headline = blocks.CharBlock(required=True)
    description = blocks.TextBlock(required=True)
    primary_cta_text = blocks.CharBlock(required=True)
    primary_cta_link = blocks.URLBlock(required=True)
    secondary_cta_text = blocks.CharBlock(required=False)
    secondary_cta_link = blocks.URLBlock(required=False)
    hero_image = ImageChooserBlock(required=True)
    show_kpi_card = blocks.BooleanBlock(required=False, default=True)
    kpi_value = blocks.CharBlock(required=False)
    kpi_label = blocks.CharBlock(required=False)

    class Meta:
        template = "blocks/hero_block.html"
        icon = "image"
        label = "Hero Section"

class StatBlock(blocks.StructBlock):
    value = blocks.CharBlock(required=True)
    label = blocks.CharBlock(required=True)

class StatsSectionBlock(blocks.StructBlock):
    stats = blocks.ListBlock(StatBlock())

    class Meta:
        template = "landing/blocks/stats_section.html"
        icon = "placeholder"
        label = "Stats Section"

class FeatureBlock(blocks.StructBlock):
    icon = blocks.CharBlock(required=True)
    title = blocks.CharBlock(required=True)
    description = blocks.TextBlock(required=True)
    color_class = blocks.CharBlock(required=True)

class FeaturesSectionBlock(blocks.StructBlock):
    features = blocks.ListBlock(FeatureBlock())

    class Meta:
        template = "landing/blocks/features_section.html"
        icon = "cogs"
        label = "Features Section"

class BenefitBlock(blocks.StructBlock):
    icon = blocks.CharBlock(required=True)
    title = blocks.CharBlock(required=True)
    description = blocks.TextBlock(required=True)

class BenefitsSectionBlock(blocks.StructBlock):
    benefits = blocks.ListBlock(BenefitBlock())
    image = ImageChooserBlock(required=True)
    headline = blocks.CharBlock(required=True)
    description = blocks.TextBlock(required=True)

    class Meta:
        template = "blocks/benefits_section.html"
        icon = "plus"
        label = "Benefits Section"

class TestimonialBlock(blocks.StructBlock):
    name = blocks.CharBlock(required=True)
    role = blocks.CharBlock(required=True)
    content = blocks.TextBlock(required=True)
    rating = blocks.IntegerBlock(required=True, min_value=1, max_value=5)

class TestimonialsSectionBlock(blocks.StructBlock):
    testimonials = blocks.ListBlock(TestimonialBlock())

    class Meta:
        template = "blocks/testimonials_section.html"
        icon = "user"
        label = "Testimonials Section"

class PricingFeatureBlock(blocks.StructBlock):
    text = blocks.CharBlock(required=True)

    class Meta:
        template = "blocks/pricing_feature.html"
        icon = "dollar"
        label = "Pricing Feature"

class PricingBlock(blocks.StructBlock):
    title = blocks.CharBlock(required=True)
    price = blocks.CharBlock(required=True)
    features = blocks.ListBlock(PricingFeatureBlock())
    cta_text = blocks.CharBlock(required=True)
    cta_link = blocks.URLBlock(required=True)
    highlight = blocks.BooleanBlock(required=False, default=False)

class PricingSectionBlock(blocks.StructBlock):
    pricing_plans = blocks.ListBlock(PricingBlock())

    class Meta:
        template = "blocks/pricing_section.html"
        icon = "money"
        label = "Pricing Section"

class CTASectionBlock(blocks.StructBlock):
    headline = blocks.CharBlock(required=True)
    description = blocks.TextBlock(required=True)
    primary_cta_text = blocks.CharBlock(required=True)
    primary_cta_link = blocks.URLBlock(required=True)
    secondary_cta_text = blocks.CharBlock(required=False)
    secondary_cta_link = blocks.URLBlock(required=False)

    class Meta:
        template = "blocks/cta_section.html"
        icon = "placeholder"
        label = "CTA Section"