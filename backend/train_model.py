#!/usr/bin/env python3
"""
Traffic Prediction Model Training
Trains a neural network with 150 epochs for ambulance traffic prediction
"""

import numpy as np
import pandas as pd
import tensorflow as tf
from tensorflow import keras
from tensorflow.keras import layers, models
from sklearn.preprocessing import MinMaxScaler
from sklearn.model_selection import train_test_split
import os
from pathlib import Path

# Set random seeds for reproducibility
np.random.seed(42)
tf.random.set_seed(42)

BASE_DIR = Path(__file__).resolve().parent
MODEL_PATH = BASE_DIR / "models"
MODEL_PATH.mkdir(exist_ok=True)

def generate_training_data(samples=1000):
    """
    Generate synthetic traffic data for training
    Features: hour_of_day, traffic_density, weather, vehicle_count, route_distance
    Target: estimated_travel_time
    """
    print("📊 Generating training data...")
    
    data = {
        'hour_of_day': np.random.randint(0, 24, samples),
        'traffic_density': np.random.uniform(0, 100, samples),
        'weather': np.random.uniform(0, 5, samples),  # 0=clear, 5=severe
        'vehicle_count': np.random.randint(0, 500, samples),
        'route_distance': np.random.uniform(1, 50, samples),
    }
    
    df = pd.DataFrame(data)
    
    # Generate target: travel time (influenced by features)
    df['travel_time'] = (
        df['route_distance'] * 2 +
        df['traffic_density'] * 0.5 +
        df['weather'] * 3 +
        df['vehicle_count'] * 0.01 +
        np.random.normal(0, 2, samples)  # Add noise
    )
    
    print(f"✅ Generated {samples} training samples")
    print(f"   Features: {list(df.columns[:-1])}")
    print(f"   Target: travel_time")
    return df

def prepare_data(df):
    """Normalize and split data"""
    print("\n📈 Preparing data...")
    
    X = df.drop('travel_time', axis=1).values
    y = df['travel_time'].values
    
    # Normalize features
    scaler = MinMaxScaler()
    X_scaled = scaler.fit_transform(X)
    
    # Split data
    X_train, X_test, y_train, y_test = train_test_split(
        X_scaled, y, test_size=0.2, random_state=42
    )
    
    print(f"✅ Training set: {X_train.shape[0]} samples")
    print(f"✅ Test set: {X_test.shape[0]} samples")
    
    return X_train, X_test, y_train, y_test, scaler

def build_model(input_shape):
    """Build neural network architecture"""
    print("\n🏗️  Building model architecture...")
    
    model = models.Sequential([
        layers.Input(shape=(input_shape,)),
        layers.Dense(128, activation='relu'),
        layers.Dropout(0.2),
        layers.Dense(64, activation='relu'),
        layers.Dropout(0.2),
        layers.Dense(32, activation='relu'),
        layers.Dropout(0.1),
        layers.Dense(1)  # Output layer for regression
    ])
    
    model.compile(
        optimizer='adam',
        loss='mse',
        metrics=['mae']
    )
    
    print("✅ Model architecture:")
    model.summary()
    return model

def train_model(model, X_train, X_test, y_train, y_test, epochs=150):
    """Train the model for specified epochs"""
    print(f"\n🚀 Training model for {epochs} epochs...")
    print("=" * 60)
    
    history = model.fit(
        X_train, y_train,
        validation_data=(X_test, y_test),
        epochs=epochs,
        batch_size=32,
        verbose=1
    )
    
    return history

def evaluate_model(model, X_test, y_test, history):
    """Evaluate model performance"""
    print("\n" + "=" * 60)
    print("📊 MODEL EVALUATION")
    print("=" * 60)
    
    loss, mae = model.evaluate(X_test, y_test, verbose=0)
    
    print(f"\n✅ Test Loss (MSE): {loss:.4f}")
    print(f"✅ Test MAE: {mae:.4f}")
    
    # Print final training metrics
    print(f"\n📈 Final Training Metrics:")
    print(f"   - Final Training Loss: {history.history['loss'][-1]:.4f}")
    print(f"   - Final Validation Loss: {history.history['val_loss'][-1]:.4f}")
    print(f"   - Final Training MAE: {history.history['mae'][-1]:.4f}")
    print(f"   - Final Validation MAE: {history.history['val_mae'][-1]:.4f}")
    
    # Calculate improvement
    initial_val_loss = history.history['val_loss'][0]
    final_val_loss = history.history['val_loss'][-1]
    improvement = ((initial_val_loss - final_val_loss) / initial_val_loss) * 100
    print(f"\n🎯 Validation Loss Improvement: {improvement:.2f}%")

def save_model(model):
    """Save trained model"""
    model_file = MODEL_PATH / "traffic_prediction_model.h5"
    model.save(str(model_file))
    print(f"\n💾 Model saved to: {model_file}")

def main():
    """Main training pipeline"""
    print("\n" + "=" * 60)
    print("🚗 TRAFFIC PREDICTION MODEL TRAINING")
    print("=" * 60)
    
    # Generate and prepare data
    df = generate_training_data(samples=1000)
    X_train, X_test, y_train, y_test, scaler = prepare_data(df)
    
    # Build and train model
    model = build_model(input_shape=X_train.shape[1])
    history = train_model(model, X_train, X_test, y_train, y_test, epochs=150)
    
    # Evaluate
    evaluate_model(model, X_test, y_test, history)
    
    # Save model
    save_model(model)
    
    print("\n" + "=" * 60)
    print("✨ TRAINING COMPLETE ✨")
    print("=" * 60)
    print("\nModel trained with:")
    print(f"  ✓ 150 epochs")
    print(f"  ✓ 1000 training samples")
    print(f"  ✓ 5 input features")
    print(f"  ✓ 3-layer neural network")
    print("\nNext steps:")
    print(f"  1. Model saved at: {MODEL_PATH}/traffic_prediction_model.h5")
    print(f"  2. Deploy to API for real-time predictions")
    print(f"  3. Monitor performance on new data")

if __name__ == "__main__":
    main()
