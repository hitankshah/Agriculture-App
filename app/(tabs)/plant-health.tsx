import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Platform,
  SafeAreaView,
} from 'react-native';
import { Camera, FileImage, CirclePlus as PlusCircle, Leaf, TriangleAlert as AlertTriangle } from 'lucide-react-native';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';

export default function PlantHealthScreen() {
  const [activePage, setActivePage] = useState('scanner');
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();
  const [lastAnalysis, setLastAnalysis] = useState(null);

  const plantIssues = [
    { 
      id: 1, 
      title: 'Leaf Spot Disease', 
      description: 'Dark brown spots with yellow halos on leaves', 
      severity: 'Medium',
      treatment: 'Apply fungicide and remove affected leaves'
    },
    {
      id: 2,
      title: 'Powdery Mildew',
      description: 'White powdery substance on leaf surfaces',
      severity: 'High',
      treatment: 'Apply neem oil or sulfur-based fungicide'
    },
    {
      id: 3,
      title: 'Aphid Infestation',
      description: 'Small insects clustering on new growth',
      severity: 'Low',
      treatment: 'Spray with insecticidal soap or neem oil'
    }
  ];

  const handleScannerPress = () => {
    if (Platform.OS === 'web') {
      alert('Camera functionality is limited on web. Please upload an image instead.');
      return;
    }

    if (!cameraPermission?.granted) {
      requestCameraPermission();
      return;
    }

    setCameraActive(true);
  };

  const handlePhotoTaken = () => {
    // Simulate analysis result
    setCameraActive(false);
    setLastAnalysis({
      image: 'https://images.pexels.com/photos/3094208/pexels-photo-3094208.jpeg',
      result: 'Healthy Plant',
      confidence: '95%',
      recommendations: 'Continue current care routine',
    });
  };

  const renderCamera = () => {
    if (!cameraActive) return null;
    
    return (
      <View style={styles.cameraContainer}>
        <CameraView style={styles.camera} facing={CameraType.back}>
          <View style={styles.cameraControls}>
            <TouchableOpacity 
              style={styles.captureButton}
              onPress={handlePhotoTaken}
            >
              <View style={styles.captureButtonInner} />
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.closeButton}
              onPress={() => setCameraActive(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </CameraView>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      
      {cameraActive ? (
        renderCamera()
      ) : (
        <>
          <View style={styles.header}>
            <Text style={styles.title}>Plant Health</Text>
            <Text style={styles.subtitle}>Diagnose and treat plant issues</Text>
          </View>
          
          <View style={styles.tabsContainer}>
            <TouchableOpacity 
              style={[styles.tab, activePage === 'scanner' && styles.activeTab]}
              onPress={() => setActivePage('scanner')}
            >
              <Text 
                style={[styles.tabText, activePage === 'scanner' && styles.activeTabText]}
              >
                Scanner
              </Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.tab, activePage === 'history' && styles.activeTab]}
              onPress={() => setActivePage('history')}
            >
              <Text 
                style={[styles.tabText, activePage === 'history' && styles.activeTabText]}
              >
                History
              </Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.tab, activePage === 'guide' && styles.activeTab]}
              onPress={() => setActivePage('guide')}
            >
              <Text 
                style={[styles.tabText, activePage === 'guide' && styles.activeTabText]}
              >
                Guide
              </Text>
            </TouchableOpacity>
          </View>
          
          {activePage === 'scanner' && (
            <ScrollView contentContainerStyle={styles.contentContainer}>
              <View style={styles.actionCard}>
                <LinearGradient
                  colors={['#E8F5E9', '#C8E6C9']}
                  style={styles.actionCardGradient}
                >
                  <View style={styles.actionCardContent}>
                    <View>
                      <Text style={styles.actionCardTitle}>Analyze Plant Health</Text>
                      <Text style={styles.actionCardSubtitle}>Take a photo or upload an image</Text>
                    </View>
                    <Image 
                      source={{ uri: 'https://images.pexels.com/photos/3094208/pexels-photo-3094208.jpeg' }} 
                      style={styles.actionCardImage}
                    />
                  </View>
                  <View style={styles.actionButtons}>
                    <TouchableOpacity 
                      style={styles.actionButton}
                      onPress={handleScannerPress}
                    >
                      <Camera size={20} color="#2E7D32" />
                      <Text style={styles.actionButtonText}>Take Photo</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.actionButton}>
                      <FileImage size={20} color="#2E7D32" />
                      <Text style={styles.actionButtonText}>Upload Image</Text>
                    </TouchableOpacity>
                  </View>
                </LinearGradient>
              </View>

              {lastAnalysis && (
                <View style={styles.resultCard}>
                  <Text style={styles.resultTitle}>Last Analysis</Text>
                  <View style={styles.resultContent}>
                    <Image 
                      source={{ uri: lastAnalysis.image }} 
                      style={styles.resultImage}
                    />
                    <View style={styles.resultInfo}>
                      <Text style={styles.resultStatus}>{lastAnalysis.result}</Text>
                      <Text style={styles.resultConfidence}>Confidence: {lastAnalysis.confidence}</Text>
                      <Text style={styles.resultRecommendation}>{lastAnalysis.recommendations}</Text>
                    </View>
                  </View>
                </View>
              )}

              <Text style={styles.sectionTitle}>Common Plant Issues</Text>
              {plantIssues.map(issue => (
                <View key={issue.id} style={styles.issueCard}>
                  <View style={styles.issueHeader}>
                    <View style={styles.issueTitleContainer}>
                      <AlertTriangle size={16} color="#ED6C02" />
                      <Text style={styles.issueTitle}>{issue.title}</Text>
                    </View>
                    <View style={[
                      styles.severityBadge,
                      issue.severity === 'High' ? styles.highSeverity :
                      issue.severity === 'Medium' ? styles.mediumSeverity :
                      styles.lowSeverity
                    ]}>
                      <Text style={styles.severityText}>{issue.severity}</Text>
                    </View>
                  </View>
                  <Text style={styles.issueDescription}>{issue.description}</Text>
                  <Text style={styles.issueTreatment}>
                    <Text style={styles.treatmentLabel}>Treatment: </Text>
                    {issue.treatment}
                  </Text>
                </View>
              ))}
            </ScrollView>
          )}
          
          {activePage === 'history' && (
            <ScrollView contentContainerStyle={styles.contentContainer}>
              <Text style={styles.emptyState}>No scan history available</Text>
            </ScrollView>
          )}
          
          {activePage === 'guide' && (
            <ScrollView contentContainerStyle={styles.contentContainer}>
              <View style={styles.guideCard}>
                <Text style={styles.guideTitle}>How to Use Plant Health Scanner</Text>
                <View style={styles.guideStep}>
                  <View style={styles.guideStepNumber}>
                    <Text style={styles.guideStepNumberText}>1</Text>
                  </View>
                  <View style={styles.guideStepContent}>
                    <Text style={styles.guideStepTitle}>Take a Clear Photo</Text>
                    <Text style={styles.guideStepDescription}>
                      Ensure good lighting and focus on the affected area
                    </Text>
                  </View>
                </View>
                <View style={styles.guideStep}>
                  <View style={styles.guideStepNumber}>
                    <Text style={styles.guideStepNumberText}>2</Text>
                  </View>
                  <View style={styles.guideStepContent}>
                    <Text style={styles.guideStepTitle}>Review Analysis</Text>
                    <Text style={styles.guideStepDescription}>
                      Wait for the AI to analyze the image and provide a diagnosis
                    </Text>
                  </View>
                </View>
                <View style={styles.guideStep}>
                  <View style={styles.guideStepNumber}>
                    <Text style={styles.guideStepNumberText}>3</Text>
                  </View>
                  <View style={styles.guideStepContent}>
                    <Text style={styles.guideStepTitle}>Follow Recommendations</Text>
                    <Text style={styles.guideStepDescription}>
                      Apply the suggested treatments to address any identified issues
                    </Text>
                  </View>
                </View>
              </View>
            </ScrollView>
          )}
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#212121',
    fontFamily: 'Poppins-Bold',
  },
  subtitle: {
    fontSize: 14,
    color: '#757575',
    fontFamily: 'Poppins-Regular',
  },
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginTop: 16,
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  tab: {
    marginRight: 24,
    paddingBottom: 12,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#2E7D32',
  },
  tabText: {
    fontSize: 16,
    color: '#757575',
    fontFamily: 'Poppins-Medium',
  },
  activeTabText: {
    color: '#2E7D32',
    fontWeight: '600',
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  actionCard: {
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 24,
  },
  actionCardGradient: {
    borderRadius: 16,
    padding: 16,
  },
  actionCardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  actionCardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#212121',
    marginBottom: 4,
    fontFamily: 'Poppins-SemiBold',
  },
  actionCardSubtitle: {
    fontSize: 14,
    color: '#424242',
    fontFamily: 'Poppins-Regular',
  },
  actionCardImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
  },
  actionButtons: {
    flexDirection: 'row',
    marginTop: 16,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingVertical: 12,
    marginRight: 8,
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#2E7D32',
    marginLeft: 8,
    fontFamily: 'Poppins-Medium',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#212121',
    marginBottom: 16,
    fontFamily: 'Poppins-SemiBold',
  },
  issueCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  issueHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  issueTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  issueTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212121',
    marginLeft: 8,
    fontFamily: 'Poppins-SemiBold',
  },
  severityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  highSeverity: {
    backgroundColor: '#FFEBEE',
  },
  mediumSeverity: {
    backgroundColor: '#FFF8E1',
  },
  lowSeverity: {
    backgroundColor: '#E8F5E9',
  },
  severityText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#212121',
    fontFamily: 'Poppins-Medium',
  },
  issueDescription: {
    fontSize: 14,
    color: '#757575',
    marginBottom: 8,
    fontFamily: 'Poppins-Regular',
  },
  issueTreatment: {
    fontSize: 14,
    color: '#424242',
    fontFamily: 'Poppins-Regular',
  },
  treatmentLabel: {
    fontWeight: '500',
    fontFamily: 'Poppins-Medium',
  },
  emptyState: {
    fontSize: 16,
    color: '#757575',
    textAlign: 'center',
    marginTop: 40,
    fontFamily: 'Poppins-Regular',
  },
  guideCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  guideTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#212121',
    marginBottom: 16,
    fontFamily: 'Poppins-SemiBold',
  },
  guideStep: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  guideStepNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#E8F5E9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  guideStepNumberText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2E7D32',
    fontFamily: 'Poppins-SemiBold',
  },
  guideStepContent: {
    flex: 1,
  },
  guideStepTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#212121',
    marginBottom: 4,
    fontFamily: 'Poppins-Medium',
  },
  guideStepDescription: {
    fontSize: 14,
    color: '#757575',
    fontFamily: 'Poppins-Regular',
  },
  resultCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#212121',
    marginBottom: 12,
    fontFamily: 'Poppins-SemiBold',
  },
  resultContent: {
    flexDirection: 'row',
  },
  resultImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 16,
  },
  resultInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  resultStatus: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2E7D32',
    marginBottom: 4,
    fontFamily: 'Poppins-SemiBold',
  },
  resultConfidence: {
    fontSize: 14,
    color: '#757575',
    marginBottom: 8,
    fontFamily: 'Poppins-Regular',
  },
  resultRecommendation: {
    fontSize: 14,
    color: '#424242',
    fontFamily: 'Poppins-Regular',
  },
  cameraContainer: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  cameraControls: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'flex-end',
    padding: 20,
  },
  captureButton: {
    alignSelf: 'center',
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 5,
    borderColor: '#FFF',
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureButtonInner: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#FFF',
  },
  closeButton: {
    alignSelf: 'center',
    padding: 8,
    marginBottom: 20,
  },
  closeButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Poppins-SemiBold',
  },
});