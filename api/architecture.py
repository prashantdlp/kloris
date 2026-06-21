import torch
import torch.nn as nn

ColorChannels = 3
dataset_clases = ['Potato_Early_blight', 'Potato_Late_blight', 'Potato_healthy']
ImageSize = (256, 256)

MyCNN = nn.Sequential(
    nn.Conv2d(
        in_channels=ColorChannels,
        out_channels=16,
        kernel_size=3,
        padding=1
    ),
    nn.ReLU(),
    nn.MaxPool2d(kernel_size=2),
    nn.Conv2d(
        in_channels=16,
        out_channels=32,
        kernel_size=3,
        padding=1
    ),
    nn.ReLU(),
    nn.MaxPool2d(kernel_size=2),
    nn.Conv2d(
        in_channels=32,
        out_channels=64,
        kernel_size=3,
        padding=1
    ),
    nn.ReLU(),
    nn.AdaptiveAvgPool2d((1,1)),
    nn.Flatten(),
    nn.Linear(
        in_features=64,
        out_features=128
    ),
    nn.ReLU(),
    nn.Linear(
        in_features=128,
        out_features=3
    )
)