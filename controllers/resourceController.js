// ==============================================
// Resource Controller
// File: /controllers/resourceController.js
// ==============================================

const { Resource, FavoriteResource, ActivityLog } = require('../models');

// Get all resources
exports.getResources = async (req, res) => {
  try {
    const { type, category, search } = req.query;
    
    const filter = { isActive: true };
    
    if (type) filter.type = type;
    if (category) filter.category = category;
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    const resources = await Resource.find(filter).sort({ name: 1 });

    // Get user's favorites
    const favorites = await FavoriteResource.find({
      userId: req.user._id
    }).select('resourceId');
    
    const favoriteIds = favorites.map(f => f.resourceId.toString());

    // Add isFavorite flag
    const resourcesWithFavorites = resources.map(resource => ({
      ...resource.toObject(),
      isFavorite: favoriteIds.includes(resource._id.toString())
    }));

    // Get statistics
    const stats = {
      total: resources.length,
      byType: {
        application: resources.filter(r => r.type === 'application').length,
        document: resources.filter(r => r.type === 'document').length,
        link: resources.filter(r => r.type === 'link').length
      }
    };

    res.json({
      success: true,
      data: resourcesWithFavorites,
      stats
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch resources',
      error: error.message
    });
  }
};

// Get single resource
exports.getResource = async (req, res) => {
  try {
    const resource = await Resource.findById(req.params.id);

    if (!resource || !resource.isActive) {
      return res.status(404).json({
        success: false,
        message: 'Resource not found'
      });
    }

    // Update access count
    resource.accessCount += 1;
    resource.lastAccessedAt = new Date();
    await resource.save();

    // Log activity
    await ActivityLog.create({
      userId: req.user._id,
      action: 'resource_accessed',
      entityType: 'resource',
      entityId: resource._id,
      metadata: {
        resourceName: resource.name,
        resourceType: resource.type
      }
    });

    res.json({
      success: true,
      data: resource
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch resource',
      error: error.message
    });
  }
};

// Get favorite resources
exports.getFavorites = async (req, res) => {
  try {
    const favorites = await FavoriteResource.find({
      userId: req.user._id
    }).populate('resourceId');

    const resources = favorites
      .filter(f => f.resourceId && f.resourceId.isActive)
      .map(f => ({
        ...f.resourceId.toObject(),
        isFavorite: true
      }));

    res.json({
      success: true,
      data: resources
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch favorites',
      error: error.message
    });
  }
};

// Toggle favorite
exports.toggleFavorite = async (req, res) => {
  try {
    const { resourceId } = req.params;

    // Check if resource exists
    const resource = await Resource.findById(resourceId);
    if (!resource) {
      return res.status(404).json({
        success: false,
        message: 'Resource not found'
      });
    }

    // Check if already favorited
    const existing = await FavoriteResource.findOne({
      userId: req.user._id,
      resourceId
    });

    if (existing) {
      // Remove favorite
      await FavoriteResource.deleteOne({ _id: existing._id });
      
      res.json({
        success: true,
        message: 'Removed from favorites',
        isFavorite: false
      });
    } else {
      // Add favorite
      await FavoriteResource.create({
        userId: req.user._id,
        resourceId
      });

      res.json({
        success: true,
        message: 'Added to favorites',
        isFavorite: true
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to toggle favorite',
      error: error.message
    });
  }
};

// Create resource (admin only)
exports.createResource = async (req, res) => {
  try {
    const resourceData = {
      ...req.body,
      ...(req.file && {
        file: {
          fileName: req.file.filename,
          originalName: req.file.originalname,
          fileSize: req.file.size,
          fileType: req.file.mimetype,
          filePath: req.file.path,
          uploadedBy: req.user._id,
          uploadedAt: new Date()
        }
      })
    };

    const resource = await Resource.create(resourceData);

    // Log activity
    await ActivityLog.create({
      userId: req.user._id,
      action: 'resource_created',
      entityType: 'resource',
      entityId: resource._id,
      metadata: {
        resourceName: resource.name,
        resourceType: resource.type
      }
    });

    res.status(201).json({
      success: true,
      message: 'Resource created successfully',
      data: resource
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to create resource',
      error: error.message
    });
  }
};

// Update resource (admin only)
exports.updateResource = async (req, res) => {
  try {
    const resource = await Resource.findById(req.params.id);

    if (!resource) {
      return res.status(404).json({
        success: false,
        message: 'Resource not found'
      });
    }

    Object.keys(req.body).forEach(key => {
      if (req.body[key] !== undefined) {
        resource[key] = req.body[key];
      }
    });

    await resource.save();

    res.json({
      success: true,
      message: 'Resource updated successfully',
      data: resource
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update resource',
      error: error.message
    });
  }
};

// Delete resource (admin only)
exports.deleteResource = async (req, res) => {
  try {
    const resource = await Resource.findById(req.params.id);

    if (!resource) {
      return res.status(404).json({
        success: false,
        message: 'Resource not found'
      });
    }

    resource.isActive = false;
    await resource.save();

    res.json({
      success: true,
      message: 'Resource deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete resource',
      error: error.message
    });
  }
};