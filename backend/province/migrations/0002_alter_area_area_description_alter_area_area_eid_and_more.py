# Generated by Django 4.2.6 on 2023-10-24 14:48

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('province', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='area',
            name='area_description',
            field=models.CharField(max_length=120, verbose_name='description'),
        ),
        migrations.AlterField(
            model_name='area',
            name='area_eid',
            field=models.CharField(max_length=30, null=True, verbose_name='area (English)'),
        ),
        migrations.AlterField(
            model_name='area',
            name='area_title',
            field=models.CharField(max_length=120, verbose_name='area'),
        ),
        migrations.AlterField(
            model_name='area',
            name='area_vorder',
            field=models.IntegerField(null=True, verbose_name='display Order'),
        ),
        migrations.AlterField(
            model_name='province',
            name='area',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='province.area', verbose_name='select Area'),
        ),
        migrations.AlterField(
            model_name='province',
            name='province_description',
            field=models.TextField(verbose_name='description'),
        ),
        migrations.AlterField(
            model_name='province',
            name='province_eid',
            field=models.CharField(max_length=30, null=True, verbose_name='province (English)'),
        ),
        migrations.AlterField(
            model_name='province',
            name='province_title',
            field=models.CharField(max_length=120, verbose_name='province'),
        ),
        migrations.AlterField(
            model_name='province',
            name='province_vorder',
            field=models.IntegerField(null=True, verbose_name='display Order'),
        ),
    ]