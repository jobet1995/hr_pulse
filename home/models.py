# models.py
from django.db import models
from wagtail.models import Page
from wagtail.fields import StreamField
from wagtail.admin.panels import FieldPanel
from .blocks import (
    HeroBlock,
    StatsSectionBlock,
    FeaturesSectionBlock,
    BenefitsSectionBlock,
    TestimonialsSectionBlock,
    PricingSectionBlock,
    CTASectionBlock,
)

# -------------------------------
# Homepage Page Model
# -------------------------------
class Homepage(Page):
    template = "home/home_page.html"

    body = StreamField(
        block_types=[
            ("hero", HeroBlock()),
            ("stats_section", StatsSectionBlock()),
            ("features_section", FeaturesSectionBlock()),
            ("benefits_section", BenefitsSectionBlock()),
            ("testimonials_section", TestimonialsSectionBlock()),
            ("pricing_section", PricingSectionBlock()),
            ("cta_section", CTASectionBlock()),
        ],
        null=True,
        blank=True,
    )

    content_panels = Page.content_panels + [
        FieldPanel("body"),
    ]

    class Meta:
        verbose_name = "Homepage"
        verbose_name_plural = "Homepages"


# -------------------------------
# Hero Section Model
# -------------------------------
class HeroSection(models.Model):
    landing_page = models.OneToOneField(
        Homepage, on_delete=models.CASCADE, related_name='hero'
    )
    title = models.CharField(max_length=200)
    subtitle = models.TextField(blank=True, null=True)
    background_image = models.ImageField(
        upload_to='hero_images/', blank=True, null=True
    )
    cta_text = models.CharField(max_length=50, blank=True, null=True)
    cta_link = models.URLField(blank=True, null=True)

    def __str__(self):
        return f"Hero for {getattr(self.landing_page, 'title', 'Untitled Page')}"


# -------------------------------
# Stats Section Model
# -------------------------------
class Stat(models.Model):
    landing_page = models.ForeignKey(
        Homepage, on_delete=models.CASCADE, related_name='stats'
    )
    value = models.CharField(max_length=50)
    label = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.label}: {self.value}"


# -------------------------------
# Features Section Model
# -------------------------------
class Feature(models.Model):
    landing_page = models.ForeignKey(
        Homepage, on_delete=models.CASCADE, related_name='features'
    )
    title = models.CharField(max_length=100)
    description = models.TextField()
    icon = models.CharField(max_length=50, blank=True, null=True)

    def __str__(self):
        return f"{self.title}"


# -------------------------------
# Benefits Section Model
# -------------------------------
class Benefit(models.Model):
    landing_page = models.ForeignKey(
        Homepage, on_delete=models.CASCADE, related_name='benefits'
    )
    title = models.CharField(max_length=100)
    description = models.TextField()
    icon = models.CharField(max_length=50, blank=True, null=True)

    def __str__(self):
        return f"{self.title}"


# -------------------------------
# Testimonials Section Model
# -------------------------------
class Testimonial(models.Model):
    landing_page = models.ForeignKey(
        Homepage, on_delete=models.CASCADE, related_name='testimonials'
    )
    name = models.CharField(max_length=100)
    role = models.CharField(max_length=100, blank=True, null=True)
    content = models.TextField()
    rating = models.IntegerField(default=5)

    def __str__(self):
        return f"{self.name} - {self.rating}⭐"


# -------------------------------
# Pricing Section Model
# -------------------------------
class PricingPlan(models.Model):
    landing_page = models.ForeignKey(
        Homepage, on_delete=models.CASCADE, related_name='pricing'
    )
    name = models.CharField(max_length=100)
    price = models.CharField(max_length=50)
    features = models.TextField()  # Or use JSONField for structured data
    most_popular = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.name}"


# -------------------------------
# CTA Section Model
# -------------------------------
class CTASection(models.Model):
    landing_page = models.OneToOneField(
        Homepage, on_delete=models.CASCADE, related_name='cta'
    )
    title = models.CharField(max_length=200)
    subtitle = models.TextField(blank=True, null=True)
    cta_text = models.CharField(max_length=50)
    cta_link = models.URLField()

    def __str__(self):
        return f"CTA for {getattr(self.landing_page, 'title', 'Untitled Page')}"
