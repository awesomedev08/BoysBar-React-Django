# Generated by Django 4.2.6 on 2023-10-24 17:03

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('province', '0002_alter_area_area_description_alter_area_area_eid_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='area',
            name='area_description',
            field=models.CharField(max_length=120, verbose_name='説明'),
        ),
        migrations.AlterField(
            model_name='area',
            name='area_eid',
            field=models.CharField(max_length=30, null=True, verbose_name='領域 (English)'),
        ),
        migrations.AlterField(
            model_name='area',
            name='area_title',
            field=models.CharField(max_length=120, verbose_name='領域'),
        ),
        migrations.AlterField(
            model_name='area',
            name='area_vorder',
            field=models.IntegerField(null=True, verbose_name='現時点で'),
        ),
        migrations.AlterField(
            model_name='province',
            name='area',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='province.area', verbose_name='領域選択'),
        ),
        migrations.AlterField(
            model_name='province',
            name='province_description',
            field=models.TextField(verbose_name='説明'),
        ),
        migrations.AlterField(
            model_name='province',
            name='province_eid',
            field=models.CharField(max_length=30, null=True, verbose_name='都道府県 (English)'),
        ),
        migrations.AlterField(
            model_name='province',
            name='province_title',
            field=models.CharField(max_length=120, verbose_name='都道府県'),
        ),
        migrations.AlterField(
            model_name='province',
            name='province_vorder',
            field=models.IntegerField(null=True, verbose_name='現時点で'),
        ),
    ]