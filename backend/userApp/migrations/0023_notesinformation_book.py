# Generated by Django 3.1 on 2023-07-07 17:45

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('userApp', '0022_recommendation_dateofrecommendation'),
    ]

    operations = [
        migrations.AddField(
            model_name='notesinformation',
            name='book',
            field=models.CharField(default=django.utils.timezone.now, max_length=200, verbose_name='book'),
            preserve_default=False,
        ),
    ]