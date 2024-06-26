# Generated by Django 3.2.23 on 2024-05-23 07:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0009_auto_20240521_1139'),
    ]

    operations = [
        migrations.AlterField(
            model_name='useraccount',
            name='cellphone_use_ai',
            field=models.CharField(blank=True, choices=[(0, 'Zero'), (1, 'One'), (2, 'Two'), (3, 'Three'), (4, 'Four'), (5, 'Five'), (6, 'Six'), (7, 'Seven'), (8, 'Eight'), (9, 'Nine')], default=0, max_length=20, null=True),
        ),
        migrations.AlterField(
            model_name='useraccount',
            name='distracted_driving_ai',
            field=models.CharField(blank=True, choices=[(0, 'Zero'), (1, 'One'), (2, 'Two'), (3, 'Three'), (4, 'Four'), (5, 'Five'), (6, 'Six'), (7, 'Seven'), (8, 'Eight'), (9, 'Nine')], default=0, max_length=20, null=True),
        ),
        migrations.AlterField(
            model_name='useraccount',
            name='harsh_acceleration',
            field=models.CharField(blank=True, choices=[(0, 'Zero'), (1, 'One'), (2, 'Two'), (3, 'Three'), (4, 'Four'), (5, 'Five'), (6, 'Six'), (7, 'Seven'), (8, 'Eight'), (9, 'Nine')], default=0, max_length=20, null=True),
        ),
        migrations.AlterField(
            model_name='useraccount',
            name='harsh_braking',
            field=models.CharField(blank=True, choices=[(0, 'Zero'), (1, 'One'), (2, 'Two'), (3, 'Three'), (4, 'Four'), (5, 'Five'), (6, 'Six'), (7, 'Seven'), (8, 'Eight'), (9, 'Nine')], default=0, max_length=20, null=True),
        ),
        migrations.AlterField(
            model_name='useraccount',
            name='harsh_cornering',
            field=models.CharField(blank=True, choices=[(0, 'Zero'), (1, 'One'), (2, 'Two'), (3, 'Three'), (4, 'Four'), (5, 'Five'), (6, 'Six'), (7, 'Seven'), (8, 'Eight'), (9, 'Nine')], default=0, max_length=20, null=True),
        ),
        migrations.AlterField(
            model_name='useraccount',
            name='idle_ratio',
            field=models.CharField(blank=True, choices=[(0, 'Zero'), (1, 'One'), (2, 'Two'), (3, 'Three'), (4, 'Four'), (5, 'Five'), (6, 'Six'), (7, 'Seven'), (8, 'Eight'), (9, 'Nine')], default=0, max_length=20, null=True),
        ),
        migrations.AlterField(
            model_name='useraccount',
            name='impact_crash_ai',
            field=models.CharField(blank=True, choices=[(0, 'Zero'), (1, 'One'), (2, 'Two'), (3, 'Three'), (4, 'Four'), (5, 'Five'), (6, 'Six'), (7, 'Seven'), (8, 'Eight'), (9, 'Nine')], default=0, max_length=20, null=True),
        ),
        migrations.AlterField(
            model_name='useraccount',
            name='obstructed_camera_ai',
            field=models.CharField(blank=True, choices=[(0, 'Zero'), (1, 'One'), (2, 'Two'), (3, 'Three'), (4, 'Four'), (5, 'Five'), (6, 'Six'), (7, 'Seven'), (8, 'Eight'), (9, 'Nine')], default=0, max_length=20, null=True),
        ),
        migrations.AlterField(
            model_name='useraccount',
            name='possible_fatigue_ai',
            field=models.CharField(blank=True, choices=[(0, 'Zero'), (1, 'One'), (2, 'Two'), (3, 'Three'), (4, 'Four'), (5, 'Five'), (6, 'Six'), (7, 'Seven'), (8, 'Eight'), (9, 'Nine')], default=0, max_length=20, null=True),
        ),
        migrations.AlterField(
            model_name='useraccount',
            name='reverse',
            field=models.CharField(blank=True, choices=[(0, 'Zero'), (1, 'One'), (2, 'Two'), (3, 'Three'), (4, 'Four'), (5, 'Five'), (6, 'Six'), (7, 'Seven'), (8, 'Eight'), (9, 'Nine')], default=0, max_length=20, null=True),
        ),
        migrations.AlterField(
            model_name='useraccount',
            name='seatbelt_off',
            field=models.CharField(blank=True, choices=[(0, 'Zero'), (1, 'One'), (2, 'Two'), (3, 'Three'), (4, 'Four'), (5, 'Five'), (6, 'Six'), (7, 'Seven'), (8, 'Eight'), (9, 'Nine')], default=0, max_length=20, null=True),
        ),
        migrations.AlterField(
            model_name='useraccount',
            name='smoking_ai',
            field=models.CharField(blank=True, choices=[(0, 'Zero'), (1, 'One'), (2, 'Two'), (3, 'Three'), (4, 'Four'), (5, 'Five'), (6, 'Six'), (7, 'Seven'), (8, 'Eight'), (9, 'Nine')], default=0, max_length=20, null=True),
        ),
        migrations.AlterField(
            model_name='useraccount',
            name='speeding',
            field=models.CharField(blank=True, choices=[(0, 'Zero'), (1, 'One'), (2, 'Two'), (3, 'Three'), (4, 'Four'), (5, 'Five'), (6, 'Six'), (7, 'Seven'), (8, 'Eight'), (9, 'Nine')], default=0, max_length=20, null=True),
        ),
    ]
