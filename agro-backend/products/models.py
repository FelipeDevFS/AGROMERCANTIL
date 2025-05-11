from django.db import models

class Product(models.Model):
    name = models.CharField(max_length=100, blank=False, null=False)
    price = models.DecimalField(max_digits=10, decimal_places=2, blank=False, null=False)

    def __str__(self):
        return self.name